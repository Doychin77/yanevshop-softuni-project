<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'products', 'name', 'email', 'address', 'phone'
    ];

    protected $casts = [
        'products' => 'array', // Ensure products is cast as an array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

