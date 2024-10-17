<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationVarification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'founder_id',
        'agent_id',
        'application_form_field_name',
        'application_form_field_value',
        'varification_status',
    ];


    public function founder()
    {
        return $this->belongsTo(Founder::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'application_form_field_name', 'document_type');
    }
}
