<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'name' => 'Admin',
            'email' => 'munna@gmail.com',
            'password' => bcrypt('11111111'),
        ]);

        User::updateOrCreate([
            'name' => 'Admin',
            'email' => 'biniyog380@gmail.com',
            'password' => bcrypt('11223@@Biniyog@25'),
        ]);
    }
}
