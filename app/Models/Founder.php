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
        'father_name',
        'mother_name',
        'manager',
        'ownership_percentage',
        'religion',
        'marital_status',
        'country_status',
        'job_title',
        'educational_qualification',
        'basic_salary',
        'transportation_allowance',
        'accommodation_allowance',
        'other_allowances',
    ];
}
