<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmissionInput extends Model
{
    use HasFactory;


    protected $fillable = [
        'formid',
        'input',
        'value',
    ];

    public function form()
    {
        return $this->belongsTo(FormSubmission::class, 'form_submission_id', 'id');
    }
}
