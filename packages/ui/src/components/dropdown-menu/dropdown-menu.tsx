'use client';

import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Check, ChevronRight, Circle } from 'lucide-react';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({
    ref,
    className,
    inset,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            'focus-visible:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
            inset && 'pl-8',
            className
        )}
        data-testid="dropdown-menu-sub-trigger"
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
            className
        )}
        data-testid="dropdown-menu-sub-content"
        {...props}
    />
);

const DropdownMenuContent = ({
    ref,
    className,
    sideOffset = 4,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-md',
                className
            )}
            data-testid="dropdown-menu-content"
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
);

const DropdownMenuItem = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            'focus-visible:bg-accent hover:bg-accent focus-visible:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            className
        )}
        data-testid="dropdown-menu-item"
        {...props}
    />
);

const DropdownMenuCheckboxItem = ({
    ref,
    className,
    children,
    checked,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            'focus-visible:bg-accent focus-visible:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        checked={checked}
        data-testid="dropdown-menu-checkbox-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioItem = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            'focus-visible:bg-accent focus-visible:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
        data-testid="dropdown-menu-radio-item"
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
        data-testid="dropdown-menu-label"
        {...props}
    />
);

const DropdownMenuSeparator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn('bg-muted -mx-1 my-1 h-px', className)}
        data-testid="dropdown-menu-separator"
        {...props}
    />
);

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
            data-testid="dropdown-menu-shortcut"
            {...props}
        />
    );
};

const DropdownMenuArrow = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Arrow>) => (
    <DropdownMenuPrimitive.Arrow
        ref={ref}
        className={cn('fill-popover h-[5px] w-[10px]', className)}
        data-testid="dropdown-menu-arrow"
        {...props}
    />
);

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuArrow,
};
