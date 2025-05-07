'use client';

import * as React from 'react';
import type { ComponentPropsWithRef } from 'react';
import { FlexibleInput, Input } from '#components/input';
import { Controller, useFormContext, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import type { ValidationModeProp } from './types.js';

// TODO: support more of react-hook-form register options
type SupportedRegisterOptions = Pick<
    RegisterOptions,
    'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'validate'
>;
type inputFinalProps = SupportedRegisterOptions & ValidationModeProp;

export const FlexibleInputField = ({
    'data-testid': dataTestId = 'field-input',
    required,
    minLength,
    maxLength,
    pattern,
    min,
    max,
    validate,
    ValidationMode,
    ...props
}: inputFinalProps & ComponentPropsWithRef<typeof FlexibleInput> & { 'data-testid'?: string }) => {
    const { formItemId, name, isValid } = useField();
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => {
                return (
                    <FlexibleInput
                        {...props}
                        value={field.value}
                        onChange={field.onChange}
                        isValid={isValid}
                        formItemId={formItemId}
                        data-testid={name}
                    />
                );
            }}
            rules={{ required, minLength, maxLength, pattern, min, max, validate }}
        />
    );
};
