import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { type Category } from '@/types'

interface PageProps extends InertiaPageProps {
    category: Category
    breadcrumbs: Array<{ title: string; href: string }>
}

function edit() {
    const { category, breadcrumbs } = usePage<PageProps>().props

    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('categories.update', category.id))
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Create Category</h1>
                <form action="" className='mt-4 space-y-4' onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        placeholder="Category Name"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? 'Creating...' : 'Create Category'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default edit