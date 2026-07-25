<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Member;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuperAdminTest extends TestCase
{
    use RefreshDatabase;

    protected User $superAdmin;
    protected User $adminPublika;
    protected User $member;

    protected function setUp(): void
    {
        parent::setUp();

        $this->superAdmin = User::factory()->create(['usertype' => 'super-admin']);
        $this->adminPublika = User::factory()->create(['usertype' => 'admin-publika']);
        $this->member = User::factory()->create(['usertype' => 'member']);
    }

    public function test_super_admin_can_access_dashboard_with_stats(): void
    {
        // Seed some data to make sure stats work
        Member::create([
            'full_name' => 'Budi Santoso',
            'nim' => '22.11.1234',
            'phone' => '081234567890',
            'batch' => 2022,
            'position' => 'Anggota',
            'status' => 'aktif',
        ]);

        $response = $this->actingAs($this->superAdmin)->get(route('super-admin.dashboard'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('stats')
            ->where('stats.total_members', 1)
            ->where('stats.total_admins', 2) // superAdmin and adminPublika
            ->has('admins')
        );
    }

    public function test_other_users_cannot_access_super_admin_dashboard(): void
    {
        $response = $this->actingAs($this->adminPublika)->get(route('super-admin.dashboard'));
        $response->assertStatus(302); // Redirected to home dashboard due to RedirectUsertype middleware

        $response = $this->actingAs($this->member)->get(route('super-admin.dashboard'));
        $response->assertStatus(302);
    }

    public function test_super_admin_can_view_users_list(): void
    {
        $response = $this->actingAs($this->superAdmin)->get(route('super-admin.users.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->has('users'));
    }

    public function test_super_admin_can_create_new_coordinator(): void
    {
        $newAdminData = [
            'name' => 'Koor PSDM Baru',
            'email' => 'psdm_new@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'usertype' => 'admin-psdm',
        ];

        $response = $this->actingAs($this->superAdmin)->post(route('super-admin.users.store'), $newAdminData);
        $response->assertRedirect(route('super-admin.users.index'));
        $this->assertDatabaseHas('users', ['email' => 'psdm_new@example.com', 'usertype' => 'admin-psdm']);
    }

    public function test_super_admin_can_edit_coordinator(): void
    {
        $targetUser = User::factory()->create(['usertype' => 'admin-psdm']);

        $updatedData = [
            'name' => 'Koor PSDM Terupdate',
            'email' => 'psdm_updated@example.com',
            'usertype' => 'admin-psdm',
        ];

        $response = $this->actingAs($this->superAdmin)->put(route('super-admin.users.update', $targetUser), $updatedData);
        $response->assertRedirect(route('super-admin.users.index'));
        $this->assertDatabaseHas('users', [
            'id' => $targetUser->id,
            'name' => 'Koor PSDM Terupdate',
            'email' => 'psdm_updated@example.com',
        ]);
    }

    public function test_super_admin_can_delete_other_coordinator(): void
    {
        $targetUser = User::factory()->create(['usertype' => 'admin-psdm']);

        $response = $this->actingAs($this->superAdmin)->delete(route('super-admin.users.destroy', $targetUser));
        $response->assertRedirect();
        $this->assertSoftDeletedOrMissing($targetUser);
    }

    public function test_super_admin_cannot_delete_themself(): void
    {
        $response = $this->actingAs($this->superAdmin)->delete(route('super-admin.users.destroy', $this->superAdmin));
        $response->assertSessionHasErrors(['message']);
        $this->assertDatabaseHas('users', ['id' => $this->superAdmin->id]);
    }

    private function assertSoftDeletedOrMissing($model)
    {
        $this->assertDatabaseMissing($model->getTable(), ['id' => $model->id]);
    }
}
