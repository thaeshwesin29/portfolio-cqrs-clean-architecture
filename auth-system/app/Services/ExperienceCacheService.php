<?php

namespace App\Services;

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
     * Fetch all experiences and cache in Mongo
     */
    public function fetchAll(): array
    {
        $experiences = $this->experienceRepo->all()
            ->filter(fn($e) => empty($e['deleted_at']));

        $mapped = $experiences->map(fn($exp) => $this->mapDocument($exp))->toArray();

        $this->storeInMongo($mapped);

        return $mapped;
    }

    /**
     * Map an experience to array for Mongo
     */
    protected function mapDocument($exp): array
    {
        if ($exp instanceof \Illuminate\Database\Eloquent\Model) {
            $exp = $exp->toArray();
        }

        return [
            'id'               => $exp['id'] ?? null,
            'position'         => $exp['position'] ?? null,
            'company'          => $exp['company'] ?? null,
            'location'         => $exp['location'] ?? null,
            'start_date'       => $exp['start_date'] ?? null,
            'end_date'         => $exp['end_date'] ?? null,
            'responsibilities' => $exp['responsibilities'] ?? null,
            'created_at'       => $exp['created_at'] ?? null,
            'updated_at'       => $exp['updated_at'] ?? null,
        ];
    }

    /**
     * Refresh cache manually
     */
    public function refreshCache(): void
    {
        $this->fetchAll();
    }

    /**
     * Store experiences in Mongo and remove stale documents
     */
    protected function storeInMongo(array $experiences)
    {
        $collection = $this->getCollection();
        $idsToKeep = array_column($experiences, 'id');

        $collection->deleteMany(['id' => ['$nin' => $idsToKeep]]);

        foreach ($experiences as $exp) {
            $collection->replaceOne(
                ['id' => $exp['id']],
                $exp,
                ['upsert' => true]
            );
        }
    }
}
