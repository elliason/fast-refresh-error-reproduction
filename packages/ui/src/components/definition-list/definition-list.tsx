import * as React from 'react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const dlVariants = cva('py-4 last:pb-0 first:pt-0', {
    variants: {
        variant: {
            horizontal: 'sm:flex sm:gap-4',
            vertical: '[&_dt]:text-xs [&_dt]:uppercase [&_dt]:tracking-widest',
        },
        background: {
            default: '',
            striped: 'even:bg-gray-50',
        },
    },
    defaultVariants: {
        variant: 'horizontal',
        background: 'default',
    },
});

interface dlProps extends React.ComponentPropsWithRef<'dl'>, VariantProps<typeof dlVariants> {}

const DefinitionList = ({
    ref,
    className,
    'data-testid': dataTestId = 'defininitionlist',
    ...props
}: React.ComponentPropsWithRef<'dl'> & { 'data-testid'?: string }) => (
    <dl
        ref={ref}
        className={cn('divide-border divide-y divide-dashed', className)}
        {...props}
        data-testid={dataTestId}
    />
);

const DefinitionItem = ({
    ref,
    className,
    variant,
    background,
    ...props
}: dlProps & React.ComponentPropsWithRef<'div'>) => (
    <div ref={ref} className={cn(dlVariants({ variant, background }), className)} {...props} />
);

const DefinitionTerm = ({
    ref,
    className,
    children,
    'data-testid': dataTestId = 'definitionterm',
    ...props
}: React.ComponentPropsWithRef<'dt'> & { 'data-testid'?: string }) => (
    <dt
        ref={ref}
        className={cn('text-muted-foreground mt-[2px] flex-1 font-normal', className)}
        {...props}
        data-testid={dataTestId}
    >
        {children}
    </dt>
);

const DefinitionDescription = ({
    ref,
    className,
    'data-testid': dataTestId = 'definitiondescription',
    ...props
}: React.ComponentPropsWithRef<'dd'> & { 'data-testid'?: string }) => (
    <dd
        ref={ref}
        className={cn('mt-1 flex-1 leading-6 sm:col-span-2 sm:mt-0.5', className)}
        {...props}
        data-testid={dataTestId}
    />
);

export { DefinitionList, DefinitionItem, DefinitionTerm, DefinitionDescription, dlVariants, type dlProps };
