import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
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
import type { Category } from '@/types'

interface PageProps extends InertiaPageProps {
    categories: Category[]
    breadcrumbs: Array<{ title: string; href: string }>
    flash: {
        message?: string
    }
}

function index() {
    const { categories, breadcrumbs, flash } = usePage<PageProps>().props
    const { delete: destroy } = useForm()


    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('categories.destroy', id))
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="m-4">
                {flash.message && (
                    <Alert variant="default">
                        <MessageSquareQuote />
                        <AlertTitle>Message!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
                <h1 className="text-2xl font-semibold">Categories</h1>
                <Link href={route('categories.create')}>
                    <Button className='mt-4 mb-4'>Create Category</Button>
                </Link>

                {categories.length > 0 ? (
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Link href={route('categories.edit', category.id)}>
                                            <Button className="bg-blue-700 text-white hover:bg-blue-900">Edit</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(category.id)} className="bg-red-700 text-white hover:bg-red-900">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) :
                    <Alert variant="destructive">
                        <AlertTitle>No Category Found</AlertTitle>
                        <AlertDescription>
                            It seems you have not created any categories yet.
                        </AlertDescription>
                    </Alert>
                }
            </div>
        </AppLayout>
    )
}

export default index