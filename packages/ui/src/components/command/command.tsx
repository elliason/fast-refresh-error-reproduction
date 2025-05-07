'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Dialog, DialogContent } from '#components/dialog';
import { cn } from '#lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

const Command = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive>) => (
    <CommandPrimitive
        ref={ref}
        className={cn('bg-popover text-popover-foreground flex h-full w-full flex-col rounded-md', className)}
        {...props}
    />
);

interface CommandDialogProps extends DialogPrimitive.DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogContent className="overflow-hidden p-0 shadow-lg">
                <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

const CommandInput = ({
    ref,
    className,
    'data-testid': dataTestId = 'commandinput',
    ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Input> & { 'data-testid'?: string }) => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
            data-testid={dataTestId}
        />
    </div>
);

const CommandList = ({
    ref,
    className,
    'data-testid': dataTestId = 'commandlist',
    ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.List> & { 'data-testid'?: string }) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
        {...props}
        data-testid={dataTestId}
    />
);

const CommandEmpty = ({ ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>) => (
    <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
);

const CommandGroup = ({
    ref,
    className,
    'data-testid': dataTestId = 'commandgroup',
    ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Group> & { 'data-testid'?: string }) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
            className
        )}
        {...props}
        data-testid={dataTestId}
    />
);

const CommandSeparator = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Separator>) => (
    <CommandPrimitive.Separator ref={ref} className={cn('bg-border -mx-1 h-px', className)} {...props} />
);

const CommandItem = ({
    ref,
    className,
    'data-testid': dataTestId = 'commanditem',
    ...props
}: React.ComponentPropsWithRef<typeof CommandPrimitive.Item> & { 'data-testid'?: string }) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            'aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
            className
        )}
        {...props}
        data-testid={dataTestId}
    />
);

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)} {...props} />;
};

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
