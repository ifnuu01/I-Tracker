<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicRequest;
use App\Models\Topic;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topics = Topic::with('category')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        // dd($topics);
        return Inertia::render('topics/index', [
            'topics' => $topics,
            'breadcrumbs' => [
                ['title' => 'Topics', 'href' => route('topics.index')],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('topics/create', [
            'categories' => $categories,
            'breadcrumbs' => [
                ['title' => 'Topics', 'href' => route('topics.index')],
                ['title' => 'Create Topic', 'href' => route('topics.create')],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TopicRequest $request)
    {
        Topic::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'target_date' => $request->target_date,
            'status' => $request->status,
        ]);
        return redirect()->route('topics.index')->with('message', 'Topic created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        $this->checkOwnership($topic);
        return Inertia::render('topics/show', [
            'topic' => $topic->load(['category', 'tasks', 'projects']),
            'breadcrumbs' => [
                ['title' => 'Topics', 'href' => route('topics.index')],
                ['title' => 'Show Topic', 'href' => route('topics.show', $topic)],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Topic $topic)
    {
        $this->checkOwnership($topic);
        $categories = Category::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('topics/edit', [
            'topic' => $topic->load(['category']),
            'categories' => $categories,
            'breadcrumbs' => [
                ['title' => 'Topics', 'href' => route('topics.index')],
                ['title' => 'Edit Topic', 'href' => route('topics.edit', $topic)],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TopicRequest $request, Topic $topic)
    {
        $this->checkOwnership($topic);
        $topic->update($request->validated());
        return redirect()->route('topics.index')->with('message', 'Topic updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $this->checkOwnership($topic);
        $topic->delete();
        return redirect()->route('topics.index')->with('message', 'Topic deleted successfully.');
    }
}
