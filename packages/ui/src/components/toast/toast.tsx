'use client';

import * as React from 'react';
import { Toast as ToastPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = ({
    ref,
    className,
    'data-testid': dataTestId = 'toast-viewport',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Viewport> & { 'data-testid'?: string }) => (
    <ToastPrimitive.Viewport
        ref={ref}
        className={cn(
            'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
            className
        )}
        data-testid={dataTestId}
        {...props}
    />
);

const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border pt-3 pr-9 pb-3 pl-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    {
        variants: {
            variant: {
                default: 'border-border bg-card text-card-foreground',
                success: 'success group border-success/30 bg-success text-success text-white',
                warning: 'warning group border-warning/30 bg-warning text-warning-foreground text-white',
                destructive: 'destructive group border-destructive/30 bg-destructive text-destructive text-white',
            },
        },

        defaultVariants: {
            variant: 'default',
        },
    }
);

const Toast = ({
    ref,
    className,
    variant,
    'data-testid': dataTestId = 'toast',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Root> & { 'data-testid'?: string } & VariantProps<
        typeof toastVariants
    >) => {
    return (
        <ToastPrimitive.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            data-testid={dataTestId}
            {...props}
        />
    );
};

const ToastAction = ({
    ref,
    className,
    'data-testid': dataTestId = 'toast-action',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Action> & { 'data-testid'?: string }) => (
    <ToastPrimitive.Action
        ref={ref}
        className={cn(
            'ring-offset-background focus:ring-ring group-[.destructive]:text-card-foreground group-[.destructive]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            className
        )}
        data-testid={dataTestId}
        {...props}
    />
);

const ToastClose = ({
    ref,
    className,
    'data-testid': dataTestId = 'toast-close',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Close> & { 'data-testid'?: string }) => (
    <ToastPrimitive.Close
        ref={ref}
        className={cn(
            'text-foreground/50 hover:text-foreground absolute right-2 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
            className
        )}
        toast-close=""
        data-testid={dataTestId}
        {...props}
    >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
    </ToastPrimitive.Close>
);

const ToastTitle = ({
    ref,
    className,
    'data-testid': dataTestId = 'toast-title',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Title> & { 'data-testid'?: string }) => (
    <ToastPrimitive.Title
        ref={ref}
        className={cn('text-sm font-semibold', className)}
        data-testid={dataTestId}
        {...props}
    />
);

const ToastDescription = ({
    ref,
    className,
    'data-testid': dataTestId = 'toast-description',
    ...props
}: React.ComponentPropsWithRef<typeof ToastPrimitive.Description> & { 'data-testid'?: string }) => (
    <ToastPrimitive.Description
        ref={ref}
        className={cn('text-sm opacity-90', className)}
        data-testid={dataTestId}
        {...props}
    />
);

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
