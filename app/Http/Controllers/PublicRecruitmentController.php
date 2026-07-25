<?php

namespace App\Http\Controllers;

use App\Models\Recruitment;
use App\Models\RecruitmentRegistrant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicRecruitmentController extends Controller
{
    /**
     * Show the public recruitment page.
     */
    public function show()
    {
        $recruitment = Recruitment::where('is_active', true)
            ->withCount('registrants')
            ->latest()
            ->first();

        return Inertia::render('Recruitment/Index', [
            'recruitment' => $recruitment,
        ]);
    }

    /**
     * Register a new applicant (no login required).
     */
    public function register(Request $request)
    {
        $recruitment = Recruitment::where('is_active', true)->latest()->firstOrFail();

        if (! $recruitment->isOpen()) {
            return back()->withErrors(['message' => 'Pendaftaran sudah ditutup.']);
        }

        // Validate required fields based on registration_fields configuration
        $fields = $recruitment->registration_fields ?? [];
        $rules = [];

        foreach ($fields as $field) {
            $fieldName = str_replace(' ', '_', strtolower($field['name']));
            $fieldRules = [];

            if ($field['required'] ?? false) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            match ($field['type']) {
                'email'    => $fieldRules[] = 'email',
                'number'   => $fieldRules[] = 'numeric',
                'checkbox' => $fieldRules[] = 'boolean',
                default    => $fieldRules[] = 'string',
            };

            $rules[$fieldName] = $fieldRules;
        }

        $validated = $request->validate($rules);

        // Check for duplicate device submission
        $deviceId = $request->header('X-Device-Identifier') ?? $request->ip();

        $alreadyRegistered = RecruitmentRegistrant::where('recruitment_id', $recruitment->id)
            ->where('device_identifier', $deviceId)
            ->exists();

        if ($alreadyRegistered) {
            return back()->withErrors(['message' => 'Anda sudah mendaftar sebelumnya.']);
        }

        RecruitmentRegistrant::create([
            'recruitment_id'    => $recruitment->id,
            'registration_data' => $validated,
            'device_identifier' => $deviceId,
        ]);

        return back()->with('success', 'Pendaftaran berhasil! Terima kasih telah mendaftar.');
    }
}
