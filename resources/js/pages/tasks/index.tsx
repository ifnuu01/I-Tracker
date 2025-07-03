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
import { MessageSquareQuote, CheckCheck, CircleX } from 'lucide-react';
import { useForm } from '@inertiajs/react'
import { Task } from '@/types'

interface PageProps extends InertiaPageProps {
    tasks: Task[]
    breadcrumbs: Array<{ title: string; href: string }>
    flash: {
        message?: string
    }
}

function index() {
    const { breadcrumbs, tasks, flash } = usePage<PageProps>().props
    const { delete: destroy } = useForm()

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            destroy(route('tasks.destroy', id));
        }
    }

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
                <Link href={route('tasks.create')}>
                    <Button className="mt-4 mb-4">Create Task</Button>
                </Link>
                {tasks.length > 0 ? (
                    <Table>
                        <TableCaption>A list of tasks.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.is_done ? <CheckCheck className="text-green-500" /> : <CircleX className="text-red-500" />}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell className={`${task.priority === 'high' ? 'text-red-500' : (task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500')}`}>{task.priority === 'high' ? 'High' : (task.priority === 'medium' ? 'Medium' : 'Low')}</TableCell>
                                    <TableCell className='space-x-2'>
                                        <Link href={route('tasks.edit', task.id)}>
                                            <Button className="bg-blue-700 text-white hover:bg-blue-900">Edit</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(task.id)} className="bg-red-700 text-white hover:bg-red-900">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Alert variant="destructive">
                        <AlertTitle>No Tasks Found</AlertTitle>
                        <AlertDescription>
                            You have not created any tasks yet. Click the button above to create a new task.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </AppLayout>
    )
}

export default index