'use client';

import * as React from 'react';
import { Label } from '#components/label';
import { cn } from '#lib/utils';
import { useField } from './field-context.js';

/**
 * Form Label. Have to be used inside FieldContext.
 */
export const FieldLabel = ({
    ref,
    className,
    'data-testid': dataTestId = 'field-label',
    ...props
}: React.ComponentPropsWithRef<'label'> & { 'data-testid'?: string }) => {
    const { formItemId, isValid } = useField();

    const htmlFor = props.htmlFor || formItemId;

    return (
        <Label
            ref={ref}
            className={cn(className)}
            htmlFor={htmlFor}
            data-valid={isValid}
            data-invalid={!isValid}
            {...props}
            data-testid={dataTestId}
        />
    );
};
