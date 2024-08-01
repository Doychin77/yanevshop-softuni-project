<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #242629;
            color: #e0e0e0;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 30%;
            margin: auto;
            padding: 20px;
            border-radius: 1rem;
            background-color: #333;
            color: #e0e0e0;
            text-align: center;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #f9a825;
            font-size: 2rem;
        }
        .content p {
            text-align: center;
            margin: 10px 0;
            color: #ccc;
        }
        .reset-code {
            display: block;
            margin: 20px 0;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            color: #f9a825;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Reset Password</h1>
    </div>
    <div class="content">
        <p>Hello {{ $username }},</p>
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
