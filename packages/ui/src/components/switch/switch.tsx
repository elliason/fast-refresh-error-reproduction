'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const Switch = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof SwitchPrimitive.Root>) => (
    <SwitchPrimitive.Root
        className={cn(
            'focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-active data-[state=unchecked]:bg-input data-[invalid=true]:border-destructive peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
        data-testid="switch"
        ref={ref}
    >
        <SwitchPrimitive.Thumb
            className={cn(
                'bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
            )}
        />
    </SwitchPrimitive.Root>
);

export { Switch };
