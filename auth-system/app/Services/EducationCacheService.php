<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Repositories\EducationRepository;

class EducationCacheService extends MongoCacheService
{
    protected EducationRepository $educationRepo;

    public function __construct(EducationRepository $educationRepo)
    {
        parent::__construct('education');
        $this->educationRepo = $educationRepo;
    }

    public function refreshCache(): void
    {
        $lastSync = Cache::get('education_last_sync', now()->subDay());
        $educations = $this->educationRepo->all()
            ->filter(fn($edu) => empty($edu['deleted_at']) || $edu['updated_at'] > $lastSync);

        $mapped = $educations->map(fn($edu) => $this->mapDocument($edu))->toArray();

        if (!empty($mapped)) {
            $this->storeInMongo($mapped);
            Cache::put('education_last_sync', now());
        }
    }

    protected function mapDocument($edu): array
    {
        if ($edu instanceof \Illuminate\Database\Eloquent\Model) $edu = $edu->toArray();
        return [
            'id' => $edu['id'] ?? null,
            'degree' => $edu['degree'] ?? null,
            'institution' => $edu['institution'] ?? null,
            'location' => $edu['location'] ?? null,
            'start_date' => $edu['start_date'] ?? null,
            'end_date' => $edu['end_date'] ?? null,
            'details' => $edu['details'] ?? null,
            'created_at' => $edu['created_at'] ?? null,
            'updated_at' => $edu['updated_at'] ?? null,
        ];
    }

    protected function storeInMongo(array $educations): void
    {
        $collection = $this->getCollection();
        $bulk = [];
        foreach ($educations as $edu) {
            $bulk[] = [
                'replaceOne' => [
                    ['id' => $edu['id']],
                    $edu,
                    ['upsert' => true]
                ]
            ];
        }
        if (!empty($bulk)) $collection->bulkWrite($bulk);
    }
}
