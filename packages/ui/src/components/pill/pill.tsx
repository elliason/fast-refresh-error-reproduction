import * as React from 'react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const pillVariants = cva('inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold', {
    variants: {
        variant: {
            primary: 'border-primary/60 bg-primary/20 text-primary',
            secondary: 'border-secondary/60 bg-secondary/10 text-secondary',
            destructive: 'border-destructive/60 bg-destructive/20 text-destructive',
            warning: 'border-warning/60 bg-warning/20 text-warning-foreground',
            success: 'border-success/60 bg-success/10 text-success',
            muted: 'border-border bg-muted text-muted-foreground',
            outline: 'border-border text-foreground bg-transparent',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export interface pillProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof pillVariants> {}

function Pill({ className, variant, ...props }: pillProps) {
    return <span className={cn(pillVariants({ variant }), className)} {...props} />;
}

export { Pill, pillVariants };
