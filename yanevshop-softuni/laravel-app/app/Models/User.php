<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'username',
        'email',
        'password',
        'reset_code',
        'reset_code_expires_at'
        ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
