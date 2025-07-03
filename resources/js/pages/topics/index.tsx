import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageSquareQuote } from 'lucide-react';
import { useForm } from '@inertiajs/react'
import { Topic } from '@/types'

interface PageProps extends InertiaPageProps {
    topics: Topic[]
    breadcrumbs: Array<{ title: string; href: string }>
    flash: {
        message?: string
    }
}

function index() {
    const { topics, breadcrumbs, flash } = usePage<PageProps>().props

    const { delete: destroy } = useForm()

    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this topic?')) {
            destroy(route('topics.destroy', id))
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Topics" />
            <div className="m-4">
                <h1 className="text-2xl font-bold">Topics</h1>
                {flash.message && (
                    <Alert variant="default" className="mt-4">
                        <MessageSquareQuote />
                        <AlertTitle>Message!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
                <Link href={route('topics.create')}>
                    <Button className="mt-4 mb-4">Create Topic</Button>
                </Link>
                {topics.length > 0 ? (
                    <Table>
                        <TableCaption>A list of topics.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Topic</TableHead>
                                <TableHead>Days Left</TableHead>
                                <TableHead>Target Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topics.map((topic) => (
                                <TableRow key={topic.id}>
                                    <TableCell className={`${topic.status === "completed" ? 'text-green-500' : (topic.status === "progress" ? 'text-yellow-500' : 'text-red-500')}`}>{topic.status === "progress" ? 'In Progress' : (topic.status === "completed" ? 'Completed' : 'Pending')}</TableCell>
                                    <TableCell>{topic.name}</TableCell>
                                    <TableCell>{topic.target_date < new Date().toISOString().split('T')[0] ? 'Overdue' : `${Math.ceil((new Date(topic.target_date).getTime() - Date.now()) / (1000 * 3600 * 24))} days left`}</TableCell>
                                    <TableCell>{topic.target_date}</TableCell>
                                    <TableCell className=" space-x-2">
                                        <Link href={route('topics.edit', topic.id)}>
                                            <Button className="bg-blue-700 text-white hover:bg-blue-900">Edit</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(topic.id)} className="bg-red-700 text-white hover:bg-red-900">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Alert variant="destructive">
                        <AlertTitle>No Topics Found</AlertTitle>
                        <AlertDescription>
                            It seems you have not created any topics yet.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </AppLayout>
    )
}

export default index