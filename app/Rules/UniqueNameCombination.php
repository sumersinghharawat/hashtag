<?php

namespace App\Rules;

use App\Models\Founder;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueNameCombination implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $names = explode(' ', $value);
        $first_name = $names[0] ?? '';
        $last_name = $names[1] ?? '';

        if(Founder::where('first_name', $first_name)->where('last_name', $last_name)->exists()){
            $fail('The combination of first name and last name must be unique.');
        }
    }
}
