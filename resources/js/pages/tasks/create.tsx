import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { useForm } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types';
import { type Topic } from '@/types'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { PageProps as InertiaPageProps } from '@inertiajs/core'

interface PageProps extends InertiaPageProps {
    breadcrumbs: BreadcrumbItem[];
    topics: Topic[];
}

function create() {
    const { breadcrumbs, topics } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        topic_id: '',
        title: '',
        note: '',
        is_done: false,
        priority: 'low',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tasks.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Create Task</h1>
                <form action="" className='mt-4 space-y-4' onSubmit={handleSubmit}>
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
                        {processing ? 'Creating...' : 'Create Task'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    )
}

export default create