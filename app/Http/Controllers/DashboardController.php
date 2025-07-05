<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Task;
use App\Models\Topic;
use App\Models\Project;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $totalTasks = Task::where('user_id', $userId)->count();
        $completedTasks = Task::where('user_id', $userId)->where('is_done', true)->count();
        $notDoneTasks = $totalTasks - $completedTasks;
        $taskCompletion = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;

        $totalProjects = Project::where('user_id', $userId)->count();
        $completedProjects = Project::where('user_id', $userId)->where('status', 'completed')->count();
        $inProgressProjects = Project::where('user_id', $userId)
            ->whereIn('status', ['pending', 'progress'])
            ->count();
        $projectCompletion = $totalProjects > 0 ? round(($completedProjects / $totalProjects) * 100) : 0;

        $recentTopics = Topic::with('category')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($topic) {
                return [
                    'id' => $topic->id,
                    'title' => $topic->name,
                    'category' => $topic->category ? $topic->category->name : 'Uncategorized'
                ];
            });

        $chartData = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayName = $date->format('D');

            $getActivityCount = function ($model, $additionalConditions = []) use ($userId, $date) {
                $query = $model::where('user_id', $userId);

                foreach ($additionalConditions as $condition) {
                    $query = $query->where($condition[0], $condition[1], $condition[2] ?? null);
                }

                return $query->where(function ($q) use ($date) {
                    $q->whereDate('created_at', $date->toDateString())
                        ->orWhere(function ($subQ) use ($date) {
                            $subQ->whereDate('updated_at', $date->toDateString())
                                ->whereDate('created_at', '!=', $date->toDateString());
                        });
                })->count();
            };

            $tasksCount = $getActivityCount(Task::class);
            $completedCount = $getActivityCount(Task::class, [['is_done', true]]);
            $projectsCount = $getActivityCount(Project::class);

            $chartData->push([
                'date' => $dayName,
                'tasks' => $tasksCount,
                'completed' => $completedCount,
                'projects' => $projectsCount,
            ]);
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'tasks' => [
                    'total' => $totalTasks,
                    'done' => $completedTasks,
                    'notDone' => $notDoneTasks,
                    'completion' => $taskCompletion
                ],
                'projects' => [
                    'total' => $totalProjects,
                    'completed' => $completedProjects,
                    'inProgress' => $inProgressProjects,
                    'completion' => $projectCompletion
                ]
            ],
            'recentTopics' => $recentTopics->toArray(),
            'chartData' => $chartData->toArray(),
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('dashboard')],
            ],
        ]);
    }
}
