<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'user_id',
        'company_id',
        'details',
        'step',
        'status',
    ];

    public function formFields()
    {
        return $this->hasMany(FormSubmissionInput::class, 'formid', 'id');
    }
}
