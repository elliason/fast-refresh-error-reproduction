'use client';

import * as React from 'react';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '#lib/utils';
import { useField } from './field-context.js';

/**
 * Field Description. Have to be used inside FieldContext.
 */

type FieldDescriptionProps = ComponentPropsWithRef<'p'> & { 'data-testid'?: string };

export const FieldDescription = ({
    className,
    'data-testid': dataTestId = 'field-description',
    ...props
}: FieldDescriptionProps) => {
    const { formDescriptionId } = useField();

    // TODO: refactor to allow composition using asChild prop
    return (
        <p
            ref={props.ref}
            id={formDescriptionId}
            className={cn('text-muted-foreground mt-1 text-sm leading-4', className)}
            {...props}
            data-testid={dataTestId}
        />
    );
};
