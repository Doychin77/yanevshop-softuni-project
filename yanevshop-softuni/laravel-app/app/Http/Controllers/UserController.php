<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Validate request inputs
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        // Create and save user
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'image' => 'avatar.png'
        ]);

        $user->save();

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function profile()
    {
        return response()->json(Auth::user());
    }

    public function update(Request $request)
    {

        try {
            $user = Auth::user();

            if ($request->filled('old_password') && $request->filled('new_password')) {
                if (!Hash::check($request->input('old_password'), $user->password)) {
                    return response()->json([
                        'errors' => ['old_password' => ['The old password is invalid!']]
                    ], 422);
                }
                $user->password = Hash::make($request->input('new_password'));
            }

            $user->username = $request->input('username');
            $user->email = $request->input('email');

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->store('images', 'public');
                $user->image = $imagePath;
            }

            $user->save();

            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }



}
