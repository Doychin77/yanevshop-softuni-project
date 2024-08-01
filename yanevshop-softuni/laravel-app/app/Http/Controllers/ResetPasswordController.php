<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\ResetPassword;

class ResetPasswordController extends Controller
{
    // Send the reset code email
    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email not found.'], 404);
        }

        // Generate a reset code
        $resetCode = Str::random(6);

        // Save the reset code to the database
        $user->reset_code = $resetCode;
        $user->reset_code_expires_at = now()->addMinutes(15);
        $user->save();

        // Send the reset code via email
        Mail::to($user->email)->send(new ResetPassword($resetCode, $user->username));

        return response()->json(['message' => 'Reset code sent successfully.'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'No user found with this email.'], 404);
        }

        // Check if the reset code is correct and not expired
        if ($user->reset_code !== $request->code || $user->reset_code_expires_at < now()) {
            return response()->json(['message' => 'Invalid or expired reset code.'], 422);
        }

        // Reset the password
        $user->password = Hash::make($request->password);
        $user->reset_code = null;
        $user->reset_code_expires_at = null;
        $user->save();

        event(new PasswordReset($user));

        return response()->json(['message' => 'Password reset successfully.'], 200);
    }



}


