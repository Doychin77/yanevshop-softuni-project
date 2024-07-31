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
            'text' => 'nullable|string',
            'rating' => 'required|integer|between:1,5',
        ]);

        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $review = Review::create([
            'product_id' => $productId,
            'user_id' => $userId,
            'text' => $request->input('text', ''),
            'rating' => $request->input('rating'),
        ]);

        return response()->json($review, 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'text' => 'nullable|string',
                'rating' => 'required|integer|between:1,5',
            ]);

            $userId = Auth::id();
            $review = Review::findOrFail($id);

            if ($review->user_id != $userId) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $review->update([
                'text' => $request->input('text', $review->text),
                'rating' => $request->input('rating'),
            ]);

            return response()->json($review);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }



    // Delete a review
    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        // Ensure the user is authorized to delete this review
        if ($review->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully'], 200);
    }
}

