import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareQuote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Globe } from 'lucide-react'
import { useForm } from '@inertiajs/react'
import type { Project } from '@/types'

interface PageProps extends InertiaPageProps {
    projects: Project[]
    breadcrumbs: Array<{ title: string; href: string }>
    flash: {
        message?: string
    }
}

function index() {
    const { breadcrumbs, projects, flash } = usePage<PageProps>().props
    const { delete: destroy } = useForm()

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this project?")) {
            destroy(route('projects.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="m-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                {flash.message && (
                    <Alert variant="default" className="mt-4">
                        <MessageSquareQuote />
                        <AlertTitle>Message!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="mt-4">
                    <Link href={route('projects.create')}>
                        <Button className="mb-4">Create Project</Button>
                    </Link>
                </div>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle className="text-xl">{project.name}</CardTitle>
                                        <CardDescription className="text-gray-500 flex items-center gap-2">
                                            {project.target_date ? (
                                                project.target_date < new Date().toISOString().split('T')[0] ? 'Overdue' : `${Math.ceil((new Date(project.target_date).getTime() - Date.now()) / (1000 * 3600 * 24))} days left`
                                            ) : 'No target date set'}
                                            <div>
                                                <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'completed' ? 'bg-green-100 text-green-800' : (project.status === 'progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}`}>
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </span>
                                            </div>
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Github className="h-4 w-4 text-gray-600" />
                                        {project.link_repo ? (
                                            <a
                                                target='_blank'
                                                href={project.link_repo}
                                                className="text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                View Repository
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No repository link</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-gray-600" />
                                        {project.link_demo ? (
                                            <a
                                                target='_blank'
                                                href={project.link_demo}
                                                className="text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                View Demo
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No demo link</span>
                                        )}
                                    </div>
                                </CardContent>
                                <CardDescription className="text-gray-700 ml-6">
                                    {project.description?.slice(0, 40) || "No description provided."}
                                </CardDescription>
                                <CardFooter className="flex gap-2">
                                    <Link href={route('projects.edit', project.id)} className="flex-1">
                                        <Button className="w-full bg-blue-700 text-white hover:bg-blue-900">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(project.id)}
                                        className="flex-1 bg-red-700 text-white hover:bg-red-900"
                                    >
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Alert variant="destructive">
                        <AlertTitle>No Projects Found</AlertTitle>
                        <AlertDescription>
                            You have not created any projects yet.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </AppLayout>
    )
}

export default index