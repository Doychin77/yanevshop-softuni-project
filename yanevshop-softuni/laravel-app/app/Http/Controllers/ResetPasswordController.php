<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Models\User;
use App\Mail\ResetCodeMail; // Create this mail class for sending reset code

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
        $user->reset_code_expires_at = now()->addMinutes(15); // Set expiry time
        $user->save();

        // Send the reset code via email
        Mail::to($user->email)->send(new ResetCodeMail($resetCode));

        return response()->json(['message' => 'Reset code sent successfully.'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = User::where('email', $request->email)
            ->where('reset_code', $request->code)
            ->where('reset_code_expires_at', '>', now())
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid or expired reset code.'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->reset_code = null; // Clear the reset code
        $user->reset_code_expires_at = null; // Clear the expiry time
        $user->save();

        event(new PasswordReset($user));

        return response()->json(['message' => 'Password reset successfully.'], 200);
    }


}


