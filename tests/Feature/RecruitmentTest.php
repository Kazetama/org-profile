<?php

namespace Tests\Feature;

use App\Models\Recruitment;
use App\Models\RecruitmentRegistrant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecruitmentTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminPsdm;
    protected User $adminPublika;
    protected User $member;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminPsdm = User::factory()->create(['usertype' => 'admin-psdm']);
        $this->adminPublika = User::factory()->create(['usertype' => 'admin-publika']);
        $this->member = User::factory()->create(['usertype' => 'member']);
    }

    public function test_admin_psdm_can_access_recruitment_index(): void
    {
        $response = $this->actingAs($this->adminPsdm)->get(route('admin-psdm.recruitment.index'));
        $response->assertStatus(200);
    }

    public function test_other_users_cannot_access_recruitment_index(): void
    {
        $response = $this->actingAs($this->adminPublika)->get(route('admin-psdm.recruitment.index'));
        $response->assertStatus(302); // Redirect due to middleware

        $response = $this->actingAs($this->member)->get(route('admin-psdm.recruitment.index'));
        $response->assertStatus(302);
    }

    public function test_admin_psdm_can_create_recruitment(): void
    {
        $recruitmentData = [
            'title' => 'Open Recruitment HMTI 2026',
            'description' => 'Ayo bergabung!',
            'registration_fields' => [
                ['name' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
                ['name' => 'NIM', 'type' => 'text', 'required' => true],
                ['name' => 'Email', 'type' => 'email', 'required' => true],
            ],
            'max_registrants' => 100,
            'starts_at' => now()->toDateTimeString(),
            'ends_at' => now()->addDays(7)->toDateTimeString(),
        ];

        $response = $this->actingAs($this->adminPsdm)->post(route('admin-psdm.recruitment.store'), $recruitmentData);
        $response->assertRedirect(route('admin-psdm.recruitment.index'));
        $this->assertDatabaseHas('recruitments', ['title' => 'Open Recruitment HMTI 2026']);
    }

    public function test_admin_psdm_can_toggle_recruitment_status(): void
    {
        $recruitment = Recruitment::create([
            'title' => 'Test Recruitment',
            'registration_fields' => [['name' => 'Nama', 'type' => 'text', 'required' => true]],
            'is_active' => false,
        ]);

        $response = $this->actingAs($this->adminPsdm)->patch(route('admin-psdm.recruitment.toggle', $recruitment));
        $response->assertRedirect();
        $this->assertTrue($recruitment->fresh()->is_active);

        // Toggle back
        $response = $this->actingAs($this->adminPsdm)->patch(route('admin-psdm.recruitment.toggle', $recruitment));
        $response->assertRedirect();
        $this->assertFalse($recruitment->fresh()->is_active);
    }

    public function test_public_can_view_active_recruitment(): void
    {
        $recruitment = Recruitment::create([
            'title' => 'Public Recruitment',
            'registration_fields' => [['name' => 'Nama', 'type' => 'text', 'required' => true]],
            'is_active' => true,
        ]);

        $response = $this->get(route('recruitment.show'));
        $response->assertStatus(200);
    }

    public function test_public_sees_closed_page_when_no_active_recruitment(): void
    {
        $response = $this->get(route('recruitment.show'));
        $response->assertStatus(200);
        // It renders Recruitment/Index with null recruitment
        $response->assertInertia(fn ($page) => $page->where('recruitment', null));
    }

    public function test_public_can_register_for_active_recruitment(): void
    {
        $recruitment = Recruitment::create([
            'title' => 'Public Recruitment',
            'registration_fields' => [
                ['name' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
                ['name' => 'Email', 'type' => 'email', 'required' => true],
            ],
            'is_active' => true,
        ]);

        $response = $this->post(route('recruitment.register'), [
            'nama_lengkap' => 'Budi Santoso',
            'email' => 'budi@example.com',
        ], [
            'X-Device-Identifier' => 'unique-device-xyz',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
        $this->assertDatabaseHas('recruitment_registrants', [
            'recruitment_id' => $recruitment->id,
            'device_identifier' => 'unique-device-xyz',
        ]);
    }

    public function test_registration_validation(): void
    {
        $recruitment = Recruitment::create([
            'title' => 'Public Recruitment',
            'registration_fields' => [
                ['name' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
                ['name' => 'Email', 'type' => 'email', 'required' => true],
            ],
            'is_active' => true,
        ]);

        // Missing required fields
        $response = $this->post(route('recruitment.register'), [
            'nama_lengkap' => '',
            'email' => 'not-an-email',
        ]);

        $response->assertSessionHasErrors(['nama_lengkap', 'email']);
    }

    public function test_prevent_duplicate_device_registration(): void
    {
        $recruitment = Recruitment::create([
            'title' => 'Public Recruitment',
            'registration_fields' => [
                ['name' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
            ],
            'is_active' => true,
        ]);

        // First registration
        $this->post(route('recruitment.register'), [
            'nama_lengkap' => 'Budi Santoso',
        ], [
            'X-Device-Identifier' => 'same-device',
        ])->assertSessionHasNoErrors();

        // Second registration from same device
        $response = $this->post(route('recruitment.register'), [
            'nama_lengkap' => 'Joko Widodo',
        ], [
            'X-Device-Identifier' => 'same-device',
        ]);

        $response->assertSessionHasErrors(['message']);
        $this->assertDatabaseCount('recruitment_registrants', 1);
    }
}
