import * as React from 'react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center border rounded-md px-2 py-1 text-xs font-semibold uppercase leading-none tracking-wide',
    {
        variants: {
            variant: {
                primary: 'border-primary/20 bg-primary/10 text-primary',
                secondary: 'border-secondary/20 bg-secondary/5 text-secondary-foreground',
                destructive: 'border-destructive/20 bg-destructive/10 text-destructive',
                warning: 'border-warning/20 bg-warning/20 text-warning-foreground',
                success: 'border-success/20 bg-success/5 text-success',
                muted: 'border-muted-foreground/10 bg-muted text-muted-foreground',
                outline: 'border-foreground text-foreground bg-background',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    dataTestId?: string;
}

function Badge({ className, variant, dataTestId, ...props }: BadgeProps) {
    const testId = dataTestId ?? `badge-${variant}`;
    return <div className={cn(badgeVariants({ variant }), className)} {...props} data-testid={testId} />;
}

export { Badge, badgeVariants };
