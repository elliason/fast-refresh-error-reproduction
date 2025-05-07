'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Switch } from '#components/switch';
import { useComposedRefs } from '#lib/react';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationModeProp } from './types.js';

type FieldSwitchProps = React.ComponentPropsWithRef<typeof Switch> & {
    'data-testid'?: string;
} & Pick<RegisterOptions, 'required'>;

export const FieldSwitch = ({
    ref: forwardRef,
    required,
    'data-testid': dataTestId = 'field-switch',
    ...props
}: FieldSwitchProps) => {
    const { formItemId, name: fieldContextName, isValid } = useField();

    const { getFieldDescription } = useDescriptionIdsContext('FieldSwitch');

    const name = props.name || fieldContextName;
    const id = props.id || formItemId;

    const { control } = useFormContext();

    const { isSubmitted } = useFormState({ name, exact: true });

    const { field } = useController({
        name,
        control,
        rules: {
            required,
        },
    });

    const composedRef = useComposedRefs(field.ref, forwardRef);

    return (
        <Switch
            id={id}
            ref={composedRef}
            name={name}
            checked={field.value}
            onCheckedChange={(checked) => {
                props.onCheckedChange?.(checked);
                field.onChange(checked);
            }}
            {...renderValidityAttributes({ isValid, isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            // disable default browser behaviour of showing built-in error message on hover
            title=""
            {...props}
            data-testid={dataTestId}
        />
    );
};
