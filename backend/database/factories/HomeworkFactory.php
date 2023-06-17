<?php

namespace Database\Factories;

use App\Models\Homework;
use Faker\Core\DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Homework>
 */
class HomeworkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'instruction' => fake()->sentence(),
            'deadline' => fake()->dateTimeThisMonth(),
        ];
    }
}
