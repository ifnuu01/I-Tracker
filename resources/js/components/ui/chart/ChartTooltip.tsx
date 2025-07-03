interface TooltipPayload {
    color: string;
    name: string;
    value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
}

export function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border border-border rounded-lg shadow-lg p-3 space-y-2">
                <p className="font-medium text-sm">{`Date: ${label}`}</p>
                <div className="space-y-1">
                    {payload.map((entry: TooltipPayload, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground">{entry.name}:</span>
                            <span className="font-medium">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
