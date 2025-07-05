<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories', CategoryController::class);
    Route::resource('topics', TopicController::class);
    Route::resource('tasks', TaskController::class)->except(['create']);
    Route::get('tasks/create/{idTopic}', [TaskController::class, 'create'])->name('tasks.create');
    Route::get('tasks/detail/{idTopic}', [TaskController::class, 'detailTask'])->name('tasks.detail');
    Route::post('tasks/{task}/complete', [TaskController::class, 'complated'])->name('tasks.complete');
    Route::resource('projects', ProjectController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
