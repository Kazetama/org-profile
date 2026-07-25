<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test: Guest harus diredirect ke login.
     */
    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    /**
     * Test: User biasa mengakses dashboard umum.
     */
    public function test_regular_user_can_access_dashboard(): void
    {
        $user = User::factory()->create(['usertype' => 'member']);
        $response = $this->actingAs($user)->get(route('dashboard'));
        $response->assertStatus(200);
    }

    /**
     * Test: Admin mengakses dashboard admin.
     */
    public function test_admin_can_access_dashboard(): void
    {
        $user = User::factory()->create(['usertype' => 'admin-publika']);
        $response = $this->actingAs($user)->get(route('admin-publika.dashboard'));
        $response->assertStatus(200);
    }

    /**
     * Test: Superadmin mengakses dashboard superadmin.
     */
    public function test_superadmin_can_access_dashboard(): void
    {
        $user = User::factory()->create(['usertype' => 'super-admin']);
        $response = $this->actingAs($user)->get(route('super-admin.dashboard'));
        $response->assertStatus(200);
    }

    /**
     * Test: Ketua mengakses dashboard ketua.
     */
    public function test_ketua_can_access_dashboard(): void
    {
        $user = User::factory()->create(['usertype' => 'admin-psdm']);
        $response = $this->actingAs($user)->get(route('admin-psdm.dashboard'));
        $response->assertStatus(200);
    }

    /**
     * Test: Proteksi Silang (Cross-Access Protection).
     * Admin TIDAK BOLEH bisa masuk ke dashboard Superadmin.
     */
    public function test_admin_cannot_access_superadmin_dashboard(): void
    {
        $admin = User::factory()->create(['usertype' => 'admin-publika']);
        $response = $this->actingAs($admin)->get(route('super-admin.dashboard'));
        $response->assertStatus(302);
    }
}
