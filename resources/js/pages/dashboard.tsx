import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductivityChart } from '@/components/ui/chart/ProductivityChart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Circle, FolderOpen, Clock, TrendingUp, Activity } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react';

interface PageProps extends InertiaPageProps {
    stats: {
        tasks: {
            total: number
            done: number
            notDone: number
            completion: number
        }
        projects: {
            total: number
            completed: number
            inProgress: number
            completion: number
        }
    }
    breadcrumbs: Array<{ title: string; href: string }>
    recentTopics: Array<{ id: number; title: string; category: string }>
    chartData: Array<{
        date: string
        tasks: number
        completed: number
        projects: number
    }>
}


export default function Dashboard() {
    const { stats, breadcrumbs, recentTopics, chartData } = usePage<PageProps>().props;

    // console.log('recentTopics', recentTopics);
    // console.log('chartData', chartData);
    // console.log('stats', stats);
    // console.log('breadcrumbs', breadcrumbs);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's an overview of your productivity.
                    </p>
                </div>

                <div className="grid auto-rows-min gap-6 md:grid-cols-3">

                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                Tasks Overview
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">{stats.tasks.total}</span>
                                <div className="text-xs text-muted-foreground">
                                    {stats.tasks.completion}% Complete
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm font-medium">Completed</span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600">{stats.tasks.done}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                    <div className="flex items-center gap-2">
                                        <Circle className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm font-medium">Pending</span>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">{stats.tasks.notDone}</span>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Progress</span>
                                    <span>{stats.tasks.completion}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.tasks.completion}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FolderOpen className="h-4 w-4 text-purple-500" />
                                Projects Overview
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">{stats.projects.total}</span>
                                <div className="text-xs text-muted-foreground">
                                    {stats.projects.completion}% Complete
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-blue-600" />
                                        <span className="text-sm font-medium">Completed</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">{stats.projects.completed}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                    <span className="text-lg font-bold text-yellow-600">{stats.projects.inProgress}</span>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Progress</span>
                                    <span>{stats.projects.completion}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${stats.projects.completion}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                Recent Topics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentTopics.slice(0, 4).map((topic) => (
                                    <div key={topic.id} className="group">
                                        <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="space-y-1 flex-1">
                                                <p className="font-medium text-sm leading-none group-hover:text-primary transition-colors">
                                                    {topic.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {topic.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-2">
                                    <Link href={route('topics.index')} className="w-full text-xs text-muted-foreground hover:text-primary transition-colors">
                                        View all topics →
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="relative min-h-[400px] flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            Productivity Analytics
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Track your progress over time and identify patterns in your productivity.
                        </p>
                    </CardHeader>
                    <CardContent className="relative flex-1 pt-6">
                        <ProductivityChart data={chartData} height={320} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
