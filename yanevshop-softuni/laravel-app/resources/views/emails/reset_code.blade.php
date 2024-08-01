<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #1e1e1e;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #ff6600;
            color: #ffffff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #ffffff; /* Ensure text is white */
        }
        .reset-code {
            display: block;
            margin: 20px 0;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: #ff6600;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Reset Password</h1>
    </div>
    <div class="content">
        <p>Hello,</p>
        <p>You requested to reset your password. Please use the following code to reset your password:</p>
        <p class="reset-code">{{ $resetCode }}</p>
        <p>If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
        <p>&copy; {{ date('Y') }} YanevShop. All rights reserved.</p>
    </div>
</div>
</body>
</html>
