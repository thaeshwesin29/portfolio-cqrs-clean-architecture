<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Repositories\ProjectRepository;

class ProjectCacheService extends MongoCacheService
{
    protected ProjectRepository $projectRepo;

    public function __construct(ProjectRepository $projectRepo)
    {
        parent::__construct('projects');
        $this->projectRepo = $projectRepo;
    }

    public function refreshCache(): void
    {
        // Only fetch updated projects since last sync
        $lastSync = Cache::get('projects_last_sync', now()->subDay());
        $projects = $this->projectRepo->allWithRelations()
            ->filter(fn($p) => empty($p['deleted_at']) || $p['updated_at'] > $lastSync);

        $mapped = $projects->map(fn($p) => $this->mapDocument($p))->toArray();

        if (!empty($mapped)) {
            $this->storeInMongo($mapped);
            Cache::put('projects_last_sync', now());
        }
    }

    protected function mapDocument($project): array
    {
        if ($project instanceof \Illuminate\Database\Eloquent\Model) {
            $project = $project->toArray();
        }

        $technologies = [];
        foreach ($project['technologies'] ?? [] as $tech) {
            $tech = $tech instanceof \Illuminate\Database\Eloquent\Model ? $tech->toArray() : $tech;
            $technologies[] = [
                'id' => $tech['id'] ?? null,
                'name' => $tech['name'] ?? null,
                'slug' => $tech['slug'] ?? null,
                'icon' => $tech['icon'] ?? null,
                'created_at' => $tech['created_at'] ?? null,
                'updated_at' => $tech['updated_at'] ?? null,
            ];
        }

        $status = null;
        if (!empty($project['status'])) {
            $status = $project['status'] instanceof \Illuminate\Database\Eloquent\Model ? $project['status']->toArray() : $project['status'];
            $status = [
                'id' => $status['id'] ?? null,
                'name' => $status['name'] ?? null,
            ];
        }

        return [
            'id' => $project['id'] ?? null,
            'title' => $project['title'] ?? null,
            'slug' => $project['slug'] ?? null,
            'description' => $project['description'] ?? null,
            'status' => $status,
            'start_date' => $project['start_date'] ?? null,
            'end_date' => $project['end_date'] ?? null,
            'is_featured' => $project['is_featured'] ?? false,
            'technologies' => $technologies,
            'created_at' => $project['created_at'] ?? null,
            'updated_at' => $project['updated_at'] ?? null,
        ];
    }

    protected function storeInMongo(array $projects): void
    {
        $collection = $this->getCollection();
        $bulk = [];

        foreach ($projects as $p) {
            $bulk[] = [
                'replaceOne' => [
                    ['id' => $p['id']],
                    $p,
                    ['upsert' => true]
                ]
            ];
        }

        if (!empty($bulk)) {
            $collection->bulkWrite($bulk);
        }
    }
}
