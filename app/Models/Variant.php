<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'title',
        'variant_type',
        'visa_count',
        'description',
        'price',
        'discount_price',
        'status',
    ];

    public function package()
    {
        return $this->belongsTo(Packages::class, 'package_id');
    }
}
