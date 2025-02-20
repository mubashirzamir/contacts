<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName,
            'surname' => $this->faker->name,
            'phone' => [
                'countryCode' => 44,
                'areaCode' => $this->faker->numerify(),
                'phoneNumber' => $this->faker->numerify('#######'),
                'isoCode' => "us",
            ],
            'email' => $this->faker->unique()->safeEmail,
            'address_line_01' => $this->faker->buildingNumber,
            'address_line_02' => $this->faker->streetSuffix,
            'address_line_03' => $this->faker->streetName,
            'city' => $this->faker->city,
            'postcode' => $this->faker->postcode,
            'avatar' => $this->faker->imageUrl(),
        ];
    }
}
