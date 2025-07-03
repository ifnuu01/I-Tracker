import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type BreadcrumbItem } from '@/types'
import { Project } from '@/types'
import { type Topic } from '@/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PageProps extends InertiaPageProps {
    project: Project
    topics: Topic[]
    breadcrumbs: BreadcrumbItem[]
}

function edit() {
    const { project, topics, breadcrumbs } = usePage<PageProps>().props

    const { data, setData, put, processing, errors } = useForm({
        name: project.name,
        description: project.description,
        link_demo: project.link_demo,
        link_repo: project.link_repo,
        topic_id: project.topic_id.toString(),
        status: project.status || 'pending',
        priority: project.priority || 'low',
        target_date: project.target_date || '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        put(route('projects.update', project.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Edit Project</h1>
                <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Project Name"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
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
                    <div className="flex gap-2 w-full">
                        <div className='w-full'>
                            <Input
                                type="text"
                                name="link_demo"
                                value={data.link_demo}
                                onChange={e => setData('link_demo', e.target.value)}
                                placeholder="Link Demo (optional)"
                            />
                            {errors.link_demo && <div className="text-red-500">{errors.link_demo}</div>}
                        </div>
                        <div className='w-full'>
                            <Input
                                type="text"
                                name="link_repo"
                                value={data.link_repo}
                                onChange={e => setData('link_repo', e.target.value)}
                                placeholder="Link Repository (optional)"
                            />
                            {errors.link_repo && <div className="text-red-500">{errors.link_repo}</div>}
                        </div>
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Description (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows={4}
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>

                    <div>
                        <Input
                            type="date"
                            name="target_date"
                            value={data.target_date}
                            onChange={e => setData('target_date', e.target.value)}
                            placeholder="Target Date"
                        />
                        {errors.target_date && <div className="text-red-500">{errors.target_date}</div>}
                    </div>

                    <div>
                        <Select value={data.status} onValueChange={value => setData('status', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <div className="text-red-500">{errors.status}</div>}
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