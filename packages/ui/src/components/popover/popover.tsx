'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = ({
    ref,
    className,
    align = 'center',
    sideOffset = 4,
    ...props
}: React.ComponentPropsWithRef<typeof PopoverPrimitive.Content>) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md p-4 shadow-md outline-none',
                className
            )}
            data-testid="popover-content"
            {...props}
        />
    </PopoverPrimitive.Portal>
);

const PopoverArrow = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof PopoverPrimitive.Arrow>) => (
    <PopoverPrimitive.Arrow
        ref={ref}
        className={cn('fill-popover h-[5px] w-[10px]', className)}
        data-testid="popover-arrow"
        {...props}
    />
);

export { Popover, PopoverTrigger, PopoverContent, PopoverArrow };
