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
        'company_name_1',
        'company_name_2',
        'company_name_3',
        'entity_type',
        'industry',
        'description',
        'type_of_freezone',
        'country',
    ];
}
