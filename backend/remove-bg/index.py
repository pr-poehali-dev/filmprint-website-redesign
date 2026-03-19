import json
import os
import io
import urllib.request
import boto3
from PIL import Image


def remove_white_background(img: Image.Image, threshold: int = 240, fuzz: int = 30) -> Image.Image:
    """Удаляет белый фон с изображения, делая его прозрачным."""
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        if r >= threshold and g >= threshold and b >= threshold:
            new_data.append((r, g, b, 0))
        elif r >= threshold - fuzz and g >= threshold - fuzz and b >= threshold - fuzz:
            alpha = int(255 * (1 - min(r, g, b) / 255))
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    return img


def handler(event: dict, context) -> dict:
    """Убирает белый фон с логотипа и сохраняет PNG в S3."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    image_url = body.get("url", "")

    with urllib.request.urlopen(image_url) as resp:
        img_bytes = resp.read()

    img = Image.open(io.BytesIO(img_bytes))
    result = remove_white_background(img)

    out = io.BytesIO()
    result.save(out, format="PNG")
    out.seek(0)

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    key = "logo-transparent.png"
    s3.put_object(Bucket="files", Key=key, Body=out.read(), ContentType="image/png")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "url": cdn_url}, ensure_ascii=False),
    }
