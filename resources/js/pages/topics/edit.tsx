import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type BreadcrumbItem } from '@/types'
import { Topic } from '@/types'
import { type Category } from '@/types'
import { Calendar } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PageProps extends InertiaPageProps {
    topic: Topic
    categories: Category[]
    breadcrumbs: BreadcrumbItem[]
}

function edit() {
    const { topic, categories, breadcrumbs } = usePage<PageProps>().props

    const { data, setData, put, processing, errors } = useForm({
        name: topic.name,
        description: topic.description || '',
        category_id: topic.category_id.toString(),
        target_date: topic.target_date || '',
        status: topic.status || 'pending',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        put(route('topics.update', topic.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Topic" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Edit Topic</h1>
                <form className='mt-4 space-y-4' onSubmit={handleSubmit}>

                    <div>
                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Topic Name"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                        <Select value={data.category_id} onValueChange={value => setData('category_id', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
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

                    <div className="relative">
                        <input
                            type="date"
                            name="target_date"
                            value={data.target_date}
                            onChange={e => setData('target_date', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                            placeholder="Target Date"
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        {errors.target_date && <div className="text-red-500">{errors.target_date}</div>}
                    </div>

                    <div>
                        <Select
                            value={data.status}
                            onValueChange={value => setData('status', value)}
                        >
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

                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? 'Updating...' : 'Update Topic'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default edit