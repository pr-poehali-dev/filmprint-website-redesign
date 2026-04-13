import json
import os
import io
import urllib.request
import boto3
from PIL import Image
import uuid


def remove_background(img: Image.Image) -> Image.Image:
    """Удаляет любой светлый/серый фон (включая шахматный), оставляя цветные тёмные пиксели."""
    img = img.convert("RGBA")
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        if a == 0:
            new_data.append((r, g, b, 0))
            continue
        brightness = (r + g + b) / 3
        max_c = max(r, g, b)
        min_c = min(r, g, b)
        saturation = (max_c - min_c) / max_c if max_c > 0 else 0
        is_gray = saturation < 0.15
        if is_gray and brightness > 140:
            new_data.append((r, g, b, 0))
        elif is_gray and brightness > 100:
            alpha = int(255 * (1 - (brightness - 100) / 40))
            new_data.append((r, g, b, min(a, alpha)))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    return img


def handler(event: dict, context) -> dict:
    """Убирает фон с изображения и сохраняет PNG в S3."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    image_url = body.get("url", "")
    filename = body.get("filename", f"nobg-{uuid.uuid4().hex[:8]}.png")

    with urllib.request.urlopen(image_url) as resp:
        img_bytes = resp.read()

    img = Image.open(io.BytesIO(img_bytes))
    result = remove_background(img)

    bbox = result.getbbox()
    if bbox:
        result = result.crop(bbox)

    out = io.BytesIO()
    result.save(out, format="PNG")
    out.seek(0)

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    key = filename
    s3.put_object(Bucket="files", Key=key, Body=out.read(), ContentType="image/png")

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "url": cdn_url}, ensure_ascii=False),
    }