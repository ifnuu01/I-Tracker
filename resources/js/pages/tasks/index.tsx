import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareQuote } from 'lucide-react';
import { useForm } from '@inertiajs/react'
import type { Topic } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps extends InertiaPageProps {
    topics: Topic[]
    breadcrumbs: Array<{ title: string; href: string }>
    flash: {
        message?: string
    }
}

function index() {
    const { breadcrumbs, topics, flash } = usePage<PageProps>().props

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="m-4">
                <h1 className="text-2xl font-bold">Tasks</h1>
                {flash.message && (
                    <Alert variant="default" className="mt-4">
                        <MessageSquareQuote />
                        <AlertTitle>Message!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
                {topics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {topics.map((topic) => (
                            <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className='flex items-center justify-between'>
                                        <CardTitle className="text-xl">{topic.name}</CardTitle>
                                        <CardDescription className="text-gray-500 flex items-center gap-2">
                                            {topic.target_date ? (
                                                topic.target_date < new Date().toISOString().split('T')[0] ? 'Overdue' : `${Math.ceil((new Date(topic.target_date).getTime() - Date.now()) / (1000 * 3600 * 24))} days left`
                                            ) : 'No target date set'}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p>Status: {topic.status}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Link href={route('tasks.detail', topic.id)}>
                                        <Button variant="outline">Detail Task</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Alert variant="destructive">
                        <AlertTitle>No Tasks Found</AlertTitle>
                        <AlertDescription>
                            You have not created any tasks yet. Click the button above to create a new task.
                        </AlertDescription>
                    </Alert>
                )
                }
            </div >
        </AppLayout >
    )
}

export default index