'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
    ref,
    className,
    'data-testid': dataTestId = 'tooltip-content',
    sideOffset = 4,
    ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Content> & { 'data-testid'?: string }) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-72 z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm tracking-normal shadow-md',
            className
        )}
        data-testid={dataTestId}
        {...props}
    />
);

const TooltipArrow = ({
    ref,
    className,
    'data-testid': dataTestId = 'tooltip-arrow',
    ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Arrow> & { 'data-testid'?: string }) => (
    <TooltipPrimitive.Arrow
        ref={ref}
        className={cn('fill-popover h-[5px] w-[10px]', className)}
        data-testid={dataTestId}
        {...props}
    />
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipArrow };
