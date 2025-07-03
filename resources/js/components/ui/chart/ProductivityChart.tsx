import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import { ChartTooltip } from './ChartTooltip';

interface ChartData {
    date: string;
    tasks: number;
    projects: number;
    completed: number;
}

interface ProductivityChartProps {
    data: ChartData[];
    height?: number;
}

export function ProductivityChart({ data, height = 300 }: ProductivityChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                    <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                />
                <YAxis
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend />

                <Area
                    type="monotone"
                    dataKey="completed"
                    stackId="1"
                    stroke="#10b981"
                    fill="url(#completedGradient)"
                    strokeWidth={2}
                    name="Completed Tasks"
                />
                <Area
                    type="monotone"
                    dataKey="tasks"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="url(#tasksGradient)"
                    strokeWidth={2}
                    name="Total Tasks"
                />
                <Area
                    type="monotone"
                    dataKey="projects"
                    stackId="3"
                    stroke="#8b5cf6"
                    fill="url(#projectsGradient)"
                    strokeWidth={2}
                    name="Projects"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
