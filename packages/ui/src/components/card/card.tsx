import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';

const Card = ({ ref, className, ...props }: React.ComponentPropsWithRef<'div'> & { 'data-testid'?: string }) => (
    <div
        ref={ref}
        className={cn(
            'bg-card text-card-foreground border-border w-full rounded-lg border shadow-md dark:shadow-lg dark:shadow-black',
            className
        )}
        data-testid="card"
        {...props}
    />
);

const CardHeader = ({
    ref,
    className,
    'data-testid': dataTestId = 'cardHeader',
    ...props
}: React.ComponentPropsWithRef<'div'> & { 'data-testid'?: string }) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-4 pb-2 lg:p-6 lg:pb-4 2xl:p-8 2xl:pb-6', className)}
        data-testid={dataTestId}
        {...props}
    />
);

const CardTitle = ({
    ref,
    className,
    'data-testid': dataTestId = 'cardTitle',
    children,
    asChild = false,
    ...props
}: React.ComponentPropsWithRef<'h3'> & { 'data-testid'?: string; asChild?: boolean }) => {
    const Component = asChild ? Slot.Root : 'h3';

    return (
        <Component
            ref={ref}
            className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
            data-testid={dataTestId}
            {...props}
        >
            {children}
        </Component>
    );
};

const CardDescription = ({
    ref,
    className,
    'data-testid': dataTestId = 'cardDescription',
    ...props
}: React.ComponentPropsWithRef<'p'> & { 'data-testid'?: string }) => (
    <p ref={ref} className={cn('text-muted-foreground text-sm', className)} data-testid={dataTestId} {...props} />
);

const CardContent = ({
    ref,
    className,
    'data-testid': dataTestId = 'cardContent',
    ...props
}: React.ComponentPropsWithRef<'div'> & { 'data-testid'?: string }) => (
    <div
        ref={ref}
        className={cn('p-4 lg:p-6 2xl:p-8 [&:not(:first-child)]:pt-0', className)}
        data-testid={dataTestId}
        {...props}
    />
);

const CardFooter = ({
    ref,
    className,
    'data-testid': dataTestId = 'cardFooter',
    ...props
}: React.ComponentPropsWithRef<'div'> & { 'data-testid'?: string }) => (
    <div
        ref={ref}
        className={cn('flex items-center p-4 pt-0 lg:p-6 2xl:p-8', className)}
        data-testid={dataTestId}
        {...props}
    />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
