'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';
import { useComposedRefs } from '#lib/react';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationModeProp } from './types.js';

/**
 * Building block for form fiels. This component is a wrapper for inputs. It forwards context attributes (name, id and value) to the input.
 */
export const InputControl = ({
    ref: forwardedRef,
    registerOptions,
    'data-testid': dataTestId = 'input-control',
    ValidationMode,
    type,
    ...controlProps
}: {
    registerOptions?: RegisterOptions;
    'data-testid'?: string;
    type?: React.HTMLInputTypeAttribute;
    ref?: React.Ref<HTMLInputElement>;
    children?: React.ReactNode;
} & ValidationModeProp) => {
    const { formItemId: id, name, isValid } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('InputControl');
    const { register, trigger } = useFormContext();
    const { isSubmitted } = useFormState({ name, exact: true });

    const { ref, onBlur, onChange, ...registerResult } = (() => {
        if (type === 'number') {
            const { pattern, valueAsDate, ...rest } = registerOptions || {};
            return register(name, {
                ...rest,
                valueAsNumber: true,
            });
        }
        return register(name, registerOptions);
    })();

    const composedRef = useComposedRefs(forwardedRef, ref);
    return (
        <Slot.Root
            id={id}
            ref={composedRef}
            {...renderValidityAttributes({ isValid, isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            // disable default browser behaviour of showing built-in error message on hover
            title=""
            {...controlProps}
            {...registerResult}
            onChange={(event) => {
                onChange(event);
                if (ValidationMode === 'onChange') {
                    trigger(name);
                }
            }}
            onBlur={(event) => {
                onBlur(event);
                if (ValidationMode === 'onBlur') {
                    trigger(name);
                }
            }}
            data-invalid={!isValid}
            data-testid={dataTestId}
        />
    );
};
