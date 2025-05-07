'use client';

import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { toggleVariants } from './toggle.js';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
    size: 'default',
    variant: 'default',
});

const ToggleGroup = ({
    ref,
    className,
    variant,
    size,
    children,
    'data-testid': dataTestId = 'toggle-group',
    ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root> & { 'data-testid'?: string } & VariantProps<
        typeof toggleVariants
    >) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn('inline-flex flex-wrap items-center gap-1 ', className)}
        data-testid={dataTestId}
        {...props}
    >
        <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
);

const ToggleGroupItem = ({
    ref,
    className,
    children,
    variant,
    size,
    'data-testid': dataTestId = 'toggle-group-item',
    ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item> & { 'data-testid'?: string } & VariantProps<
        typeof toggleVariants
    >) => {
    const context = React.useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className
            )}
            data-testid={dataTestId}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
};

export { ToggleGroup, ToggleGroupItem };
