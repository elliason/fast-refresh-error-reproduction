'use client';

import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Check } from 'lucide-react';

const Checkbox = ({ ref, className, ...props }: React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            'border-input ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-active data-[state=checked]:text-active-foreground data-[invalid=true]:border-destructive bg-input-background peer h-7 w-7 shrink-0 rounded-sm border leading-4 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center')}>
            <Check className="h-4 w-4 text-white" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
);

export { Checkbox };
