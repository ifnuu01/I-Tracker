import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type BreadcrumbItem } from '@/types'
import { Task } from '@/types'
import { type Topic } from '@/types'
import { Calendar } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PageProps extends InertiaPageProps {
    task: Task
    topics: Topic[]
    breadcrumbs: BreadcrumbItem[]
}

function edit() {
    const { task, topics, breadcrumbs } = usePage<PageProps>().props

    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        note: task.note || '',
        topic_id: task.topic_id.toString(),
        is_done: task.is_done.toString(),
        priority: task.priority || 'low',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        put(route('tasks.update', task.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Edit Task</h1>
                <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            placeholder="Task Title"
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <Select value={data.topic_id} onValueChange={value => setData('topic_id', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {topics.map(topic => (
                                    <SelectItem key={topic.id} value={topic.id.toString()}>
                                        {topic.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.topic_id && <div className="text-red-500">{errors.topic_id}</div>}
                    </div>

                    <div>
                        <textarea
                            name="note"
                            value={data.note}
                            onChange={e => setData('note', e.target.value)}
                            placeholder="Note (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows={4}
                        />
                        {errors.note && <div className="text-red-500">{errors.note}</div>}
                    </div>
                    <div>
                        <Select value={data.is_done} onValueChange={value => setData('is_done', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Not Done</SelectItem>
                                <SelectItem value="1">Done</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.is_done && <div className="text-red-500">{errors.is_done}</div>}
                    </div>

                    <div>
                        <Select value={data.priority} onValueChange={value => setData('priority', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && <div className="text-red-500">{errors.priority}</div>}
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? 'Updating...' : 'Update Task'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default edit