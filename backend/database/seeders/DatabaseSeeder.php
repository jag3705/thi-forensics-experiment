<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Homework;
use App\Models\HomeworkUpload;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Enable auto seed only on empty db
        if (Student::count() > 0){
            return;
        }

        Homework::factory()
            ->count(15)
            ->create();

        // Create useful demo user content
        $me = new Student();
        $me->name = "Jan-Moritz Galler";
        $me->email = "jag3705@thi.de";
        $me->mtr = "678123";
        $me->bio = "Jan, 28, Avionics Software Engineer @ Airbus";
        $me->avatar = 'avatars/default.jpg';
        $me->email_verified_at = now();
        $me->remember_token = Str::random(10);
        //'Test123123';
        $me->password = '$2y$10$QvJnM5WJXYpH3D/26KfrYeLF9BGPGJyiC4iSpwSsl.cY4MX2Y3Axe';
        $me->save();

        Student::factory()
            ->count(10)
            ->create();

        foreach (Student::all() as $student){
            foreach (Homework::all() as $homework) {
                if ($homework->id % 2){
                    $upload = new HomeworkUpload();
                    $upload->student_id = $student->id;
                    $upload->homework_id = $homework->id;
                    $upload->notes = fake()->sentence();
                    $upload->upload_path = "default.zip";
                    if(fake()->boolean()){
                        $upload->grade = fake()->numberBetween(1, 6);
                    }
                    $upload->save();
                }
            }
        }

    }
}
