<?php

namespace Database\Seeders;

use App\Models\Packages;
use App\Models\Variant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VariantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $packages = Packages::where(['status'=>1])->get();
        $variants = [];
        foreach($packages as $package){
            if($package->title == 'Sharjah Publishing City Free Zone (SPC)'){
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'Company License Cost',
                    'variant_type'=>'license',
                    'price'=>'6885',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'1 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>1,
                    'price'=>'8115',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'2 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>2,
                    'price'=>'13310',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'3 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>3,
                    'price'=>'18505',
                    'status'=>1
                ];
            }
            if($package->title == 'Ajman Free Zone Authority (AFZ)'){
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'Company License Cost',
                    'variant_type'=>'license',
                    'price'=>'5555',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'1 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>1,
                    'price'=>'16195',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'2 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>2,
                    'price'=>'19195',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'3 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>3,
                    'price'=>'24195',
                    'status'=>1
                ];
            }
            if($package->title == 'International Free Zone Authority (IFZA)'){
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'Company License Cost',
                    'variant_type'=>'license',
                    'price'=>'12900',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'1 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>1,
                    'price'=>'2000',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'2 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>2,
                    'price'=>'4000',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'3 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>3,
                    'price'=>'6000',
                    'status'=>1
                ];
            }
            if($package->title == 'Ras Al Khaimah Economic Zone (RAKEZ)'){
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'Company License Cost',
                    'variant_type'=>'license',
                    'price'=>'6010',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'1 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>1,
                    'price'=>'8000',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'2 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>2,
                    'price'=>'16000',
                    'status'=>1
                ];
                $variants[] = [
                    'package_id'=>$package->id,
                    'title'=>'3 Visa Cost',
                    'variant_type'=>'visa',
                    'visa_count'=>3,
                    'price'=>'24000',
                    'status'=>1
                ];
            }
        }

        // Insert the job titles into the JobTitle table
        foreach ($variants as $variant) {
            Variant::create($variant);
        }
    }
}
