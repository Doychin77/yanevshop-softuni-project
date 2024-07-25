<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #333;
        }
        .content p {
            margin: 10px 0;
            color: #555;
        }
        .product-list {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        .product-list th, .product-list td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .product-list th {
            background-color: #f4f4f4;
        }
        .centered-text {
            text-align: center;
            margin-top: 20px;
            font-size: 1.2em;
            color: #333;
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
        <h1>Order Confirmation</h1>
    </div>
    <div class="content">
        <p>Dear <strong>{{ $deliveryInfo['name'] }}</strong>,</p>
        <p>Your order has been successfully placed!</p>
        <p><strong>Address:</strong> {{ $deliveryInfo['address'] }}</p>
        <p><strong>Phone:</strong> {{ $deliveryInfo['phone'] }}</p>
        <div class="centered-text">
            <h2>Purchased Products:</h2>
        </div>
        <table class="product-list">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            @foreach($products as $product)
                <tr>
                    <td>{{ $product['name'] }}</td>
                    <td>{{ $product['quantity'] }}</td>
                    <td>${{ $product['price'] }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="centered-text">
            <p>Thank you for shopping with us!</p>
        </div>
    </div>
    <div class="footer">
        <p>&copy; 2024 YanevShop. All rights reserved.</p>
    </div>
</div>
</body>
</html>
