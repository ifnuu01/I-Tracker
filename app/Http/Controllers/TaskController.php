<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Models\Topic;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with('topic')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
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
        return Inertia::render('tasks/create', [
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Create Task', 'href' => route('tasks.create')],
            ],
            'topics' => $topics,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'note' => $request->note,
            'topic_id' => $request->topic_id,
            'is_done' => $request->is_done ?? false,
            'priority' => $request->priority ?? 'medium',
        ]);
        return redirect()->route('tasks.index')->with('message', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $this->checkOwnership($task);
        return Inertia::render('tasks/show', [
            'task' => $task->load('topic'),
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Task Details', 'href' => route('tasks.show', $task)],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $this->checkOwnership($task);
        $topics = Topic::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('tasks/edit', [
            'task' => $task->load('topic'),
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Edit Task', 'href' => route('tasks.edit', $task)],
            ],
            'topics' => $topics,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        $this->checkOwnership($task);
        $task->update($request->validated());
        return redirect()->route('tasks.index')->with('message', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->checkOwnership($task);
        $task->delete();
        return redirect()->route('tasks.index')->with('message', 'Task deleted successfully.');
    }
}
