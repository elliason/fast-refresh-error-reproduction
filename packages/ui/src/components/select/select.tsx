'use client';

import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Check, ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            'border-input bg-input-background ring-offset-background data-[invalid=true]:border-destructive placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full items-center justify-between gap-4 rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className
        )}
        data-testid="select-trigger"
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
);

const SelectScrollUpButton = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        data-testid="select-scroll-up-button"
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        data-testid="select-scroll-down-button"
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
);

const SelectPortal = SelectPrimitive.Portal;

const SelectViewport = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Viewport>) => (
    <SelectPrimitive.Viewport ref={ref} className={cn('p-1', className)} data-testid="select-viewport" {...props}>
        {children}
    </SelectPrimitive.Viewport>
);

const SelectContent = ({
    ref,
    className,
    children,
    position = 'popper',
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>) => (
    <SelectPortal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
                position === 'popper' &&
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className
            )}
            position={position}
            data-testid="select-content"
            {...props}
        >
            <SelectScrollUpButton />
            <SelectViewport
                className={cn(
                    position === 'popper' &&
                        'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                )}
            >
                {children}
            </SelectViewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPortal>
);

const SelectLabel = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
        data-testid="select-label"
        {...props}
    />
);

const SelectItem = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        data-testid="select-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
);

const SelectSeparator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn('bg-muted -mx-1 my-1 h-px', className)}
        data-testid="select-seperator"
        {...props}
    />
);

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectPortal,
    SelectViewport,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
