import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { useForm } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageProps as InertiaPageProps } from '@inertiajs/core'

interface PageProps extends InertiaPageProps {
    breadcrumbs: BreadcrumbItem[];
}

function create() {
    const { breadcrumbs } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
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

export default create