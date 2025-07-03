<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('categories/index', [
            'categories' => $categories,
            'breadcrumbs' => [
                ['title' => 'Categories', 'href' => route('categories.index')],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categories/create', [
            'breadcrumbs' => [
                ['title' => 'Categories', 'href' => route('categories.index')],
                ['title' => 'Create Category', 'href' => route('categories.create')],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        Category::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
        ]);
        return redirect()->route('categories.index')->with('message', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->checkOwnership($category);

        return Inertia::render('categories/show', [
            'category' => $category,
            'breadcrumbs' => [
                ['title' => 'Categories', 'href' => route('categories.index')],
                ['title' => 'Edit Category', 'href' => route('categories.show', $category)],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $this->checkOwnership($category);

        return Inertia::render('categories/edit', [
            'category' => $category,
            'breadcrumbs' => [
                ['title' => 'Categories', 'href' => route('categories.index')],
                ['title' => 'Edit Category', 'href' => route('categories.edit', $category)],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $this->checkOwnership($category);

        $category->update($request->validated());
        return redirect()->route('categories.index')->with('message', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->checkOwnership($category);

        $category->delete();
        return redirect()->route('categories.index')->with('message', 'Category deleted successfully.');
    }
}
