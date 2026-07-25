<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecruitmentRegistrant extends Model
{
    protected $fillable = [
        'recruitment_id',
        'registration_data',
        'device_identifier',
    ];

    protected $casts = [
        'registration_data' => 'array',
    ];

    public function recruitment()
    {
        return $this->belongsTo(Recruitment::class);
    }
}
