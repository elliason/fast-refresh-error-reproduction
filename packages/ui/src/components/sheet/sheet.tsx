'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const Sheet = DialogPrimitive.Root;

const SheetTrigger = DialogPrimitive.Trigger;

const SheetClose = DialogPrimitive.Close;

const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>) => (
    <DialogPrimitive.Overlay
        className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-primary/20 fixed inset-0 z-50',
            className
        )}
        {...props}
        ref={ref}
        data-testid="sheet-overlay"
    />
);

const sheetVariants = cva(
    'fixed z-50 gap-4 bg-card p-6 text-foreground space-y-8 shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
    {
        variants: {
            side: {
                top: 'inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                bottom: 'inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
                right: 'inset-y-0 right-0 h-full w-3/4  data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    }
);

interface SheetContentProps
    extends React.ComponentPropsWithRef<typeof DialogPrimitive.Content>,
        VariantProps<typeof sheetVariants> {}

const SheetContent = ({ ref, side = 'right', className, children, ...props }: SheetContentProps) => (
    <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn('overflow-y-auto', sheetVariants({ side }), className)}
            data-testid="sheet-content"
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="ring-offset-background focus-visible:ring-ring data-[state=open]:bg-secondary absolute -top-1 right-4 m-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none">
                <X className="h-5 w-5" />
                <span className="sr-only" data-testid="sheet-close">
                    Close
                </span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </SheetPortal>
);

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('flex flex-col text-center sm:text-left', className)} data-testid="sheet-header" {...props} />
);

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        data-testid="sheet-footer"
        {...props}
    />
);

const SheetTitle = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn('text-foreground text-2xl font-semibold', className)}
        data-testid="sheet-title"
        {...props}
    />
);

const SheetDescription = ({
    ref,
    className,

    ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Description>) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('text-muted-foreground mt-1 text-sm', className)}
        data-testid="sheet-description"
        {...props}
    />
);

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
