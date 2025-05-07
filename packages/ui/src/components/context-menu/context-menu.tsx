'use client';

import * as React from 'react';
import { ContextMenu as ContextMenuPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Check, ChevronRight, Circle } from 'lucide-react';

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = ({
    ref,
    className,
    inset,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }) => (
    <ContextMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
            inset && 'pl-8',
            className
        )}
        data-testid="context-menu-sub-trigger"
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
);

const ContextMenuSubContent = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.SubContent>) => (
    <ContextMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
            className
        )}
        data-testid="context-menu-sub-content"
        {...props}
    />
);

const ContextMenuContent = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Content>) => (
    <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
            ref={ref}
            className={cn(
                'bg-popover text-popover-foreground animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
                className
            )}
            data-testid="context-menu-content"
            {...props}
        />
    </ContextMenuPrimitive.Portal>
);

const ContextMenuItem = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }) => (
    <ContextMenuPrimitive.Item
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            className
        )}
        data-testid="context-menu-item"
        {...props}
    />
);

const ContextMenuCheckboxItem = ({
    ref,
    className,
    children,
    checked,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.CheckboxItem>) => (
    <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        checked={checked}
        data-testid="context-menu-checkbox-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </ContextMenuPrimitive.CheckboxItem>
);

const ContextMenuRadioItem = ({
    ref,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.RadioItem>) => (
    <ContextMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        data-testid="context-menu-radiot-item"
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </ContextMenuPrimitive.RadioItem>
);

const ContextMenuLabel = ({
    ref,
    className,
    inset,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }) => (
    <ContextMenuPrimitive.Label
        ref={ref}
        className={cn('text-foreground px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
        data-testid="context-menu-label"
        {...props}
    />
);

const ContextMenuSeparator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator>) => (
    <ContextMenuPrimitive.Separator
        ref={ref}
        className={cn('bg-border -mx-1 my-1 h-px', className)}
        data-testid="context-menu-separator"
        {...props}
    />
);

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
            data-testid="context-menu-shortcut"
            {...props}
        />
    );
};

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuGroup,
    ContextMenuPortal,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuRadioGroup,
};
