<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\Topic;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('topic')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'breadcrumbs' => [
                ['title' => 'Projects', 'href' => route('projects.index')],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $topics = Topic::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('projects/create', [
            'breadcrumbs' => [
                ['title' => 'Projects', 'href' => route('projects.index')],
                ['title' => 'Create Project'],
            ],
            'topics' => $topics,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        Project::create([
            'user_id' => Auth::id(),
            'topic_id' => $request->topic_id,
            'name' => $request->name,
            'link_demo' => $request->link_demo,
            'link_repo' => $request->link_repo,
            'description' => $request->description,
            'status' => $request->status,
            'priority' => $request->priority ?? 'medium',
            'target_date' => $request->target_date,
        ]);
        return redirect()->route('projects.index')->with('message', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $this->checkOwnership($project);
        return Inertia::render('projects/show', [
            'project' => $project->load('topic'),
            'breadcrumbs' => [
                ['title' => 'Projects', 'href' => route('projects.index')],
                ['title' => 'Project Details', 'href' => route('projects.show', $project)],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $this->checkOwnership($project);
        $topics = Topic::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('projects/edit', [
            'project' => $project->load('topic'),
            'topics' => $topics,
            'breadcrumbs' => [
                ['title' => 'Projects', 'href' => route('projects.index')],
                ['title' => 'Edit Project', 'href' => route('projects.edit', $project)],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $this->checkOwnership($project);
        $project->update($request->validated());
        return redirect()->route('projects.index')->with('message', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $this->checkOwnership($project);
        $project->delete();
        return redirect()->route('projects.index')->with('message', 'Project deleted successfully.');
    }
}
