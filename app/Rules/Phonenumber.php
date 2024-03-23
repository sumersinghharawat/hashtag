<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Phonenumber implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
        // $phoneNumber = preg_replace('/\D/', '', $value);


        // Regular expression to validate phone number with country code
        $pattern = '/^\+[1-9]{1}[0-9]{3,14}$/'; // Example pattern: +971123456789

        // Check if the phone number matches the pattern
        if (preg_match($pattern, $value)) {
        } else {
            $fail('The phonenumber is not valid!'.$value);
        }

    }
}
