<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            // Store the image in the public/images directory
            $image->storeAs('public/images', $imageName);
        } else {
            return response()->json(['error' => 'Image not provided'], 422);
        }

        $category = Category::create([
            'name' => $request->name,
            'image' => $imageName,
        ]);

        return response()->json($category, 201);
    }

    public function products($id)
    {
        $category = Category::with('products')->find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json([
            'name' => $category->name,
            'products' => $category->products
        ]);
    }
}
