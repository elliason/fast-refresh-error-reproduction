'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

interface ProgressProps extends React.ComponentPropsWithRef<typeof ProgressPrimitive.Root> {
    indicatorClassName?: string;
}

const Progress = ({ ref, className, value, indicatorClassName, ...props }: ProgressProps) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700', className)}
        data-testid="progress"
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn('bg-primary h-full w-full flex-1 transition-all', indicatorClassName)}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
);

export { Progress };
