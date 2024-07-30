<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    // Get reviews for a product
    public function index($productId)
    {
        $reviews = Review::with('user')->where('product_id', $productId)->get();
        return response()->json($reviews);
    }

    // Store a new review
    public function store(Request $request, $productId)
    {
        $request->validate([
            'text' => 'required|string',
            'rating' => 'required|integer|between:1,5',
        ]);

        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $review = Review::create([
            'product_id' => $productId,
            'user_id' => $userId,
            'text' => $request->input('text'),
            'rating' => $request->input('rating'),
        ]);

        return response()->json($review, 201);
    }
}

