'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const toggleVariants = cva(
    'inline-flex items-center rounded-md font-normal text-left ring-offset-background transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:ring-2 data-[state=on]:border-active data-[state=on]:bg-active/5 data-[state=on]:text-active ring-active ring-inset',
    {
        variants: {
            variant: {
                default:
                    'border border-input bg-input-background hover:bg-active-hover/5 hover:border-active-hover hover:text-active-hover',
            },
            size: {
                default: 'h-10 px-4',
                sm: 'h-8 px-2.5 text-xs font-medium',
                lg: 'h-11 px-5 text-base',
                auto: 'p-5 data-[state=on]:text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const Toggle = ({
    ref,
    className,
    variant,
    size,
    'data-testid': dataTestId = 'toggle',
    ...props
}: React.ComponentPropsWithRef<typeof TogglePrimitive.Root> & { 'data-testid'?: string } & VariantProps<
        typeof toggleVariants
    >) => (
    <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        data-testid={dataTestId}
        {...props}
    />
);

export { Toggle, toggleVariants };
