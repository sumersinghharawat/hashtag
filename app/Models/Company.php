<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Company extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'user_id',
        'name',
        'entity_type',
        'industry',
        'description',
        'country',
    ];
}
