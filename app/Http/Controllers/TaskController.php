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
        $topics = Topic::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('tasks/index', [
            'topics' => $topics,
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
            ],
        ]);
    }

    public function detailTask($idTopic)
    {
        $tasks = Task::with('topic')
            ->where('user_id', Auth::id())
            ->where('topic_id', $idTopic)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($tasks->isEmpty()) {
            return redirect()->route('tasks.index')->with('message', 'No tasks found for this topic.');
        }

        return Inertia::render('tasks/detail', [
            'tasks' => $tasks,
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Task Details', 'href' => route('tasks.detail', $idTopic)],
            ],
            'idTopic' => $idTopic,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($idTopic)
    {
        // dd($idTopic);
        $topics = Topic::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('tasks/create', [
            'breadcrumbs' => [
                ['title' => 'Tasks', 'href' => route('tasks.index')],
                ['title' => 'Task Details', 'href' => route('tasks.detail', $idTopic)],
                ['title' => 'Create Task', 'href' => route('tasks.create', $idTopic)],
            ],
            'topics' => $topics,
            'idTopic' => $idTopic,
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
        return redirect()->route('tasks.detail', $request->topic_id)->with('message', 'Task created successfully.');
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
                ['title' => 'Task Details', 'href' => route('tasks.detail', $task->topic_id)],
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
        return redirect()->route('tasks.detail', $task->topic_id)->with('message', 'Task updated successfully.');
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

    public function complated(Task $task)
    {
        $this->checkOwnership($task);
        $task->is_done = true;
        $task->save();
        return redirect()->route('tasks.detail', $task->topic_id)->with('message', 'Task marked as completed.');
    }
}
