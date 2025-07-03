import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head, usePage, router } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type BreadcrumbItem } from '@/types'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { type Category } from '@/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PageProps extends InertiaPageProps {
    categories: Category[];
    breadcrumbs: BreadcrumbItem[];
}

function create() {
    const { breadcrumbs, categories } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        description: '',
        target_date: '',
        status: 'pending',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post(route('topics.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Topic" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Create Topic</h1>
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
                        <Select
                            value={data.category_id}
                            onValueChange={value => setData('category_id', value)}
                        >
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
                        {processing ? 'Creating...' : 'Create Topic'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default create