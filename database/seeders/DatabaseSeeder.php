<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Ketua Umum HMTI',
            'email' => 'ketua@example.com',
            'usertype' => 'super-admin',
        ]);

        User::factory()->create([
            'name' => 'Admin Publika',
            'email' => 'admin_publikasi@example.com',
            'usertype' => 'admin-publika',
        ]);

        User::factory()->create([
            'name' => 'Admin PSDM',
            'email' => 'admin_psdm@example.com',
            'usertype' => 'admin-psdm',
        ]);

        User::factory()->create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'usertype' => 'member',
        ]);
    }
}
