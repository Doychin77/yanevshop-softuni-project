<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;

class OrderController extends Controller
{
    public function sendEmail(Request $request)
    {
        $deliveryInfo = $request->all();

        $products = $request->get('products', []);

        Mail::to($deliveryInfo['email'])->send(new OrderConfirmation($deliveryInfo, $products));

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
}

