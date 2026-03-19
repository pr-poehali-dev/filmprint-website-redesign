import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта FilmPrint на email менеджера."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    service = body.get("service", "").strip()
    message = body.get("message", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и контакт обязательны"}, ensure_ascii=False),
        }

    to_email = os.environ.get("CONTACT_EMAIL", "")
    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
      <div style="background: #1a1a1a; padding: 24px; border-radius: 4px; margin-bottom: 20px;">
        <h1 style="color: #e63946; margin: 0; font-size: 22px; letter-spacing: 2px;">FILMPRINT</h1>
        <p style="color: #999; margin: 4px 0 0; font-size: 12px;">Новая заявка с сайта</p>
      </div>
      <div style="background: white; border-radius: 4px; padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase; width: 140px;">Имя</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase;">Контакт</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a;">{contact}</td>
          </tr>
          {"" if not service else f'''<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #999; font-size: 12px; text-transform: uppercase;">Услуга</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a;">{service}</td>
          </tr>'''}
          {"" if not message else f'''<tr>
            <td style="padding: 12px 0; color: #999; font-size: 12px; text-transform: uppercase; vertical-align: top;">Сообщение</td>
            <td style="padding: 12px 0; color: #1a1a1a; line-height: 1.6;">{message}</td>
          </tr>'''}
        </table>
      </div>
      <p style="color: #bbb; font-size: 11px; text-align: center; margin-top: 16px;">Это письмо отправлено автоматически с сайта filmprint.ru</p>
    </div>
    """

    if smtp_user and smtp_pass and to_email:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка от {name} — FilmPrint"
        msg["From"] = smtp_user
        msg["To"] = to_email
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Заявка принята"}, ensure_ascii=False),
    }
