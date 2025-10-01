<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProjectCacheService;
use App\Services\EducationCacheService;
use App\Services\ExperienceCacheService;

class DashboardController extends Controller
{
    protected ProjectCacheService $projectCache;
    protected EducationCacheService $educationCache;
    protected ExperienceCacheService $experienceCache;

    public function __construct(
        ProjectCacheService $projectCache,
        EducationCacheService $educationCache,
        ExperienceCacheService $experienceCache
    ) {
        $this->projectCache = $projectCache;
        $this->educationCache = $educationCache;
        $this->experienceCache = $experienceCache;
    }

    /**
     * Return dashboard statistics (projects, education, experiences, activities, hire me)
     */
    public function stats()
    {
        return response()->json([
            'total_projects'    => count($this->projectCache->fetchAll()),
            'total_education'   => count($this->educationCache->fetchAll()),
            'total_experiences' => count($this->experienceCache->fetchAll()),

            // 🚀 Hire Me status
            'hire_me' => 'Available',

            // 🔄 Recent activities
            'activities' => [
                'Created new project "Portfolio Website"',
                'Updated Education: Bachelor of IT',
                'Added new Experience: Web Developer at XYZ'
            ],
        ]);
    }
}
