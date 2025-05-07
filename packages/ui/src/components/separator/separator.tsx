'use client';

import * as React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const Separator = ({
    ref,
    className,
    orientation = 'horizontal',
    decorative = true,
    ...props
}: React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root>) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
            'bg-border shrink-0',
            orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
            className
        )}
        data-testid="separator"
        {...props}
    />
);

export { Separator };
