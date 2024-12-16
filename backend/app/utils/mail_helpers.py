from app.extensions import mail, serializer
from flask_mail import Message


def send_mail(reset_data):
    token = serializer.dumps(obj=reset_data["recipients"], salt=reset_data["salt"])
    msg = Message(subject=reset_data["subject"], recipients=[reset_data["recipients"]])
    reset_link = f"{reset_data['reset_url']}{token}"
    msg.body = f"{reset_data['body']} {reset_link}"
    mail.send(msg)
