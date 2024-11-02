<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You</title>
</head>
<body>
    <p>Dear {{ $name }},</p>

    <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>

    <p>Here are the details you provided:</p>
    <ul>
        <li><strong>Name:</strong> {{ $name }}</li>
        <li><strong>Email:</strong> {{ $email }}</li>
        <li><strong>Phone Number:</strong> {{ $phone }}</li>
        <li><strong>Message:</strong> {{ $messages }}</li>
    </ul>

    <p>Best regards,<br> incorpX</p>
</body>
</html>
