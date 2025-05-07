'use client';

import * as React from 'react';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const ScrollArea = ({
    ref,
    viewPortRef,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root> & {
    viewPortRef?: React.Ref<HTMLDivElement>;
}) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        data-testid="scroll-area"
        {...props}
    >
        <ScrollAreaPrimitive.Viewport ref={viewPortRef} className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
);

const ScrollBar = ({
    ref,
    className,
    orientation = 'vertical',
    ...props
}: React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className
        )}
        data-testid="scroll-bar"
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

export { ScrollArea, ScrollBar };
