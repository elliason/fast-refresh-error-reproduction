'use client';

import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva(
    'text-sm font-normal leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1 block data-[invalid=true]:text-destructive'
);

/**
 * The basic primitive for all labels.
 */
const Label = ({
    ref,
    className,
    ...props
}: React.ComponentPropsWithRef<typeof LabelPrimitive.Root> & { 'data-testid'?: string }) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} data-testid="label" {...props} />
);

export { Label };
