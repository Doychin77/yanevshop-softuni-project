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
        $product = Product::findOrFail($id);
        return response()->json($product);
    }


    public function index()
    {
        $products = Product::all();

        return response()->json($products);
    }


    public function store(Request $request)
    {

        \Log::info('Received Files: ', $request->file('images'));

        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate each image file
            'category_id' => 'required|exists:categories,id',
        ]);

        // Initialize an array to store the image names
        $imageNames = [];

        // Handle image uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                // Generate a unique name for the image
                $imageName = time() . '_' . $image->getClientOriginalName();

                // Store the image in the public/images directory
                $image->storeAs('public/images', $imageName);

                // Add the image name to the array
                $imageNames[] = $imageName;
                \Log::info('Image Names: ', $imageNames);

            }
        }

        // Create the product
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'images' => !empty($imageNames) ? json_encode($imageNames) : null, // Convert array to JSON string
            'category_id' => $request->category_id,
        ]);

        \Log::info('Product Data: ', [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'images' => $imageNames,
            'category_id' => $request->category_id,
        ]);

        // Return a JSON response with the created product
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

            $image->storeAs('public/images', $imageName);

            if ($product->image) {
                Storage::delete('public/images/' . $product->image);
            }

            $product->image = $imageName;
        }

        $product->save();

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image) {
            Storage::delete('public/images/' . $product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

}


