<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function show($id)
    {
        $product = Product::findOrFail($id); // Fetch the product by ID from the database
        return response()->json($product);
    }


    public function index()
    {
        $products = Product::all(); // Fetch all products from the database

        return response()->json($products);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            // Store the image in the public/images directory
            $image->storeAs('public/images', $imageName);
        } else {
            return response()->json(['error' => 'Image not provided'], 422);
        }

        // Create the product
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imageName, // Store the image name or path in the database
            'category_id' => $request->category_id,
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {

        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Update the product details
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->category_id = $validatedData['category_id'];

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            // Store the image in the public/images directory
            $image->storeAs('public/images', $imageName);
        } else {
            return response()->json(['error' => 'Image not provided'], 422);
        }

        $product->save();

        return response()->json($product, 200);
    }


}
