<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Repositories\ExperienceRepository;

class ExperienceCacheService extends MongoCacheService
{
    protected ExperienceRepository $experienceRepo;

    public function __construct(ExperienceRepository $experienceRepo)
    {
        parent::__construct('experiences'); // Mongo collection name
        $this->experienceRepo = $experienceRepo;
    }

    /**
     * Refresh Mongo cache with only new/updated experiences
     */
    public function refreshCache(): void
    {
        $lastSync = Cache::get('experiences_last_sync', now()->subDay());

        $experiences = $this->experienceRepo->all()
            ->filter(fn($exp) => empty($exp['deleted_at']) || $exp['updated_at'] > $lastSync);

        $mapped = $experiences->map(fn($exp) => $this->mapDocument($exp))->toArray();

        if (!empty($mapped)) {
            $this->storeInMongo($mapped);
            Cache::put('experiences_last_sync', now());
        }
    }

    /**
     * Map experience model or array to standardized array for Mongo
     */
    protected function mapDocument($exp): array
    {
        if ($exp instanceof \Illuminate\Database\Eloquent\Model) {
            $exp = $exp->toArray();
        }

        return [
            'id' => $exp['id'] ?? null,
            'position' => $exp['position'] ?? null,
            'company' => $exp['company'] ?? null,
            'location' => $exp['location'] ?? null,
            'start_date' => $exp['start_date'] ?? null,
            'end_date' => $exp['end_date'] ?? null,
            'responsibilities' => $exp['responsibilities'] ?? null,
            'created_at' => $exp['created_at'] ?? null,
            'updated_at' => $exp['updated_at'] ?? null,
        ];
    }

    /**
     * Store mapped experiences into Mongo with bulk write
     */
    protected function storeInMongo(array $experiences): void
    {
        $collection = $this->getCollection();
        $bulk = [];

        foreach ($experiences as $exp) {
            $bulk[] = [
                'replaceOne' => [
                    ['id' => $exp['id']],
                    $exp,
                    ['upsert' => true],
                ],
            ];
        }

        if (!empty($bulk)) {
            $collection->bulkWrite($bulk);
        }
    }
}
