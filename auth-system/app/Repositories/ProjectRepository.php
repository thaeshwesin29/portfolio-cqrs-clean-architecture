<?php

namespace App\Repositories;

use App\Models\Project;

class ProjectRepository extends BaseRepository
{
    public function __construct()
    {
        parent::__construct(modelName: 'Project');
    }

    /**
     * Create a project with pivot relations (technologies) dynamically
     */
    public function createWithRelations(array $data)
    {
        $techIds = $data['technology_ids'] ?? [];
        unset($data['technology_ids']);

        $project = parent::create($data);

        if (!empty($techIds)) {
            $this->syncOrDetachRelationship($project, 'technologies', $techIds, true);
        }

        return $project->load('technologies', 'status');
    }

    /**
     * Update a project with pivot relations (technologies)
     */
    public function updateWithRelations(int $id, array $data)
    {
        $techIds = $data['technology_ids'] ?? [];
        unset($data['technology_ids']);

        $project = parent::update($id, $data);

        if (!empty($techIds)) {
            $this->syncOrDetachRelationship($project, 'technologies', $techIds, true);
        }

        return $project->load('technologies', 'status');
    }

    /**
     * Fetch all projects with relations
     */
    public function allWithRelations()
    {
        return Project::with(['technologies', 'status'])->get();
    }

    /**
     * Find a project by ID with relations
     */
    public function findWithRelations(int $id)
    {
        return Project::with(['technologies', 'status'])->findOrFail($id);
    }

    /**
     * List projects with optional search filter
     */
    public function list(array $filters = [])
    {
        $query = $this->model->query();

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return $query->with(['technologies', 'status'])->get();
    }

}
