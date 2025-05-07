import { cn } from '#lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('bg-muted animate-pulse rounded-md', className)} data-testid="skeleton" {...props} />;
}

export { Skeleton };
