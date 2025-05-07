'use client';

import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = ({
    ref,
    className,
    'data-testid': dataTestId = 'alert-overlay',
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Overlay> & { 'data-testid'?: string }) => (
    <AlertDialogPrimitive.Overlay
        className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80',
            className
        )}
        {...props}
        data-testid={dataTestId}
        ref={ref}
    />
);

const AlertDialogContent = ({
    ref,
    className,
    'data-testid': dataTestId = 'alert-dialog-content',
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Content> & { 'data-testid'?: string }) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-card fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
                className
            )}
            data-testid={dataTestId}
            {...props}
        />
    </AlertDialogPortal>
);

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
        data-testid="alert-dialog-header"
        {...props}
    />
);

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        data-testid="alert-dialog-footer"
        {...props}
    />
);

const AlertDialogTitle = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        data-testid="alert-dialog-title"
        {...props}
    />
);

const AlertDialogDescription = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground text-sm', className)}
        data-testid="alert-dialog-description"
        {...props}
    />
);

const AlertDialogAction = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Action>) => (
    <AlertDialogPrimitive.Action ref={ref} className={cn(className)} data-testid="alert-dialog-action" {...props} />
);

const AlertDialogCancel = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Cancel>) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={cn('mt-2 sm:mt-0', className)}
        data-testid="alert-dialog-cancel"
        {...props}
    />
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
