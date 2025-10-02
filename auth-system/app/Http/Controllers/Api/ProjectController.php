<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;
use App\Application\Buses\CommandBus;
use App\Application\Buses\QueryBus;
use App\Application\Commands\CrudCommand;
use App\Application\Queries\CrudQuery;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    protected CommandBus $commandBus;
    protected QueryBus $queryBus;
    protected ProjectRepository $projectRepository;

    public function __construct(CommandBus $commandBus, QueryBus $queryBus, ProjectRepository $projectRepository)
    {
        $this->commandBus = $commandBus;
        $this->queryBus = $queryBus;
        $this->projectRepository = $projectRepository;
    }

    /**
     * List projects with optional search filter.
     */
    public function index(Request $request)
    {
        $filters = [];

        if ($request->filled('q')) {
            $filters['search'] = $request->query('q');
        }

        $projects = $this->projectRepository->list($filters);

        return ProjectResource::collection($projects);
    }

    /**
     * Store a new project.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = $this->commandBus->dispatch(
            new CrudCommand('Project', 'create', $request->validated())
        );

        return new ProjectResource($project);
    }

    /**
     * Show single project.
     */
    public function show(int $id)
    {
        $project = $this->queryBus->dispatch(
            new CrudQuery('Project', 'get', ['id' => $id])
        );

        if (!$project) return response()->json(['success' => false, 'message' => 'Project not found'], 404);

        $project->loadMissing(['technologies', 'status']);

        return new ProjectResource($project);
    }

    /**
     * Update project.
     */
    public function update(UpdateProjectRequest $request, int $id)
    {
        $payload = array_merge(['id' => $id], $request->validated());

        $project = $this->commandBus->dispatch(
            new CrudCommand('Project', 'update', $payload)
        );

        return new ProjectResource($project);
    }

    /**
     * Delete project.
     */
    public function destroy(int $id)
    {
        $this->commandBus->dispatch(
            new CrudCommand('Project', 'delete', ['id' => $id])
        );

        return response()->json(null, 204);
    }
}
