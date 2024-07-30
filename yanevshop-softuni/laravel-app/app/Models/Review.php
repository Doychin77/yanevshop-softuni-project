<?php

// app/Models/Review.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'rating', 'user_id', 'product_id'];

    // Define relationships if needed
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

