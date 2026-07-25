<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recruitment extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_active',
        'registration_fields',
        'max_registrants',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'registration_fields' => 'array',
        'is_active'           => 'boolean',
        'starts_at'           => 'datetime',
        'ends_at'             => 'datetime',
    ];

    public function registrants()
    {
        return $this->hasMany(RecruitmentRegistrant::class);
    }

    public function isFull(): bool
    {
        if (! $this->max_registrants) {
            return false;
        }

        return $this->registrants()->count() >= $this->max_registrants;
    }

    /**
     * Check if this recruitment is currently open for registration.
     */
    public function isOpen(): bool
    {
        if (! $this->is_active) {
            return false;
        }

        $now = now();

        if ($this->starts_at && $now->lt($this->starts_at)) {
            return false;
        }

        if ($this->ends_at && $now->gt($this->ends_at)) {
            return false;
        }

        return ! $this->isFull();
    }
}
