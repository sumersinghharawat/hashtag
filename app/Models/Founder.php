<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Founder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'visa_status',
        'first_name',
        'last_name',
        'manager',
        'ownership_percentage',
    ];
}
