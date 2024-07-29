<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
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
            width: 50%;
            margin: auto;
            padding: 20px;
            border-radius: 1rem;
            background-color: #333;
            color: #e0e0e0;
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
            margin: 10px 0;
            color: #ccc;
        }
        .product-list {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }
        .product-list th, .product-list td {
            border: 1px solid #555;
            padding: 12px;
            text-align: left;
        }
        .product-list th {
            background-color: #444;
            color: #f9a825;
        }
        .centered-text {
            text-align: center;
            margin-top: 20px;
            font-size: 1.5em;
            color: #f9a825;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #888;
        }
        .total-price {
            font-weight: bold;
            text-align: right;
            padding-right: 20px;
        }
        .total-price td {
            color: #f9a825;
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
            <h2>Purchased Products</h2>
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
            <tfoot>
            <tr>
                <td colspan="2" class="total-price">Total Price:</td>
                <td class="total-price">${{ $totalPrice }}</td>
            </tr>
            </tfoot>
        </table>
        <div class="centered-text">
            <p>We're grateful for your trust in us. Thanks for your order!</p>
        </div>
    </div>
    <div class="footer">
        <p>&copy; 2024 YanevShop. All rights reserved.</p>
    </div>
</div>
</body>
</html>
