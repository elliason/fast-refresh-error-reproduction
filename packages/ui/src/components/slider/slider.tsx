'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const Slider = ({
    ref,
    className,
    'data-testid': dataTestId = 'slider',
    ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
    'data-testid'?: string;
}) => {
    const value = props.value || props.defaultValue;

    if (!value) {
        console.error('slider value not provided');
        return;
    }

    return (
        <div>
            <SliderPrimitive.Root
                ref={ref}
                className={cn('relative flex w-full touch-none select-none items-center', className)}
                data-testid={dataTestId}
                {...props}
            >
                <SliderPrimitive.Track
                    className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100"
                    data-testid="track"
                >
                    <SliderPrimitive.Range className="bg-active absolute h-full" data-testid="range" />
                </SliderPrimitive.Track>

                {value.map((_, i) => (
                    <SliderPrimitive.Thumb
                        className="bg-active ring-offset-background focus-visible:ring-ring size-5 block rounded-full border-2 border-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        data-testid="thumb"
                        key={i}
                    />
                ))}
            </SliderPrimitive.Root>
        </div>
    );
};

export { Slider };
