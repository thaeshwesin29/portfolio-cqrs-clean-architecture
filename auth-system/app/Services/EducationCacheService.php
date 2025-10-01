<?php

namespace App\Services;

use App\Repositories\EducationRepository;

class EducationCacheService extends MongoCacheService
{
    protected EducationRepository $educationRepo;

    public function __construct(EducationRepository $educationRepo)
    {
        parent::__construct('education'); // Mongo collection name
        $this->educationRepo = $educationRepo;
    }

    /**
     * Fetch all education records from repository and store in Mongo cache
     */
    public function fetchAll(): array
    {
        $educations = $this->educationRepo->all()
            ->filter(fn($edu) => empty($edu['deleted_at']));

        $mapped = $educations->map(fn($edu) => $this->mapDocument($edu))->toArray();

        $this->storeInMongo($mapped);

        return $mapped;
    }

    /**
     * Map Education model or array to standardized array for Mongo
     */
    protected function mapDocument($edu): array
    {
        if ($edu instanceof \Illuminate\Database\Eloquent\Model) {
            $edu = $edu->toArray();
        }

        return [
            'id'          => $edu['id'] ?? null,
            'degree'      => $edu['degree'] ?? null,
            'institution' => $edu['institution'] ?? null,
            'location'    => $edu['location'] ?? null,
            'start_date'  => $edu['start_date'] ?? null,
            'end_date'    => $edu['end_date'] ?? null,
            'details'     => $edu['details'] ?? null,
            'created_at'  => $edu['created_at'] ?? null,
            'updated_at'  => $edu['updated_at'] ?? null,
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
     * Store mapped education records into Mongo collection
     */
    protected function storeInMongo(array $educations): void
    {
        $collection = $this->getCollection();

        $idsToKeep = array_column($educations, 'id');

        // Remove any records not in the current set
        $collection->deleteMany(['id' => ['$nin' => $idsToKeep]]);

        // Upsert each education record
        foreach ($educations as $edu) {
            $collection->replaceOne(
                ['id' => $edu['id']],
                $edu,
                ['upsert' => true]
            );
        }
    }
}
