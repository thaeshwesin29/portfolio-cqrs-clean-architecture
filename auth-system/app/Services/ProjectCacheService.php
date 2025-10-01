<?php

namespace App\Services;

use App\Repositories\ProjectRepository;

class ProjectCacheService extends MongoCacheService
{
    protected ProjectRepository $projectRepo;

    public function __construct(ProjectRepository $projectRepo)
    {
        parent::__construct('projects');
        $this->projectRepo = $projectRepo;
    }

    public function fetchAll(): array
    {
        $projects = $this->projectRepo->allWithRelations()
            ->filter(fn($p) => empty($p['deleted_at']));

        $mapped = $projects->map(fn($project) => $this->mapDocument($project))->toArray();

        $this->storeInMongo($mapped);

        return $mapped;
    }

    protected function mapDocument($project): array
    {
        if ($project instanceof \Illuminate\Database\Eloquent\Model) {
            $project = $project->toArray();
        }

        $technologies = [];
        foreach ($project['technologies'] ?? [] as $tech) {
            if ($tech instanceof \Illuminate\Database\Eloquent\Model) {
                $tech = $tech->toArray();
            }
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
            if ($project['status'] instanceof \Illuminate\Database\Eloquent\Model) {
                $project['status'] = $project['status']->toArray();
            }
            $status = [
                'id' => $project['status']['id'] ?? null,
                'name' => $project['status']['name'] ?? null,
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

    public function refreshCache(): void
    {
        $this->fetchAll();
    }

    protected function storeInMongo(array $projects)
    {
        $collection = $this->getCollection();

        $idsToKeep = array_column($projects, 'id');

        $collection->deleteMany(['id' => ['$nin' => $idsToKeep]]);

        foreach ($projects as $project) {
            $collection->replaceOne(
                ['id' => $project['id']],
                $project,
                ['upsert' => true]
            );
        }
    }
}
