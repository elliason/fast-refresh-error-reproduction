'use client';

import React from 'react';
import { type FieldError, type FieldErrorsImpl, type Merge } from 'react-hook-form';
import { useFieldContext } from './field-context.js';
import type { MatchOptionsKeys } from './message.js';
import { useFieldValidity } from './use-field-validity.js';

interface FieldValidityStateProps {
    children({
        validityMap,
        isDirty,
        isValid,
        isTouched,
    }: {
        validityMap: Record<MatchOptionsKeys, boolean>;
        isValid: boolean;
        isDirty: boolean;
        isTouched: boolean;
    }): React.ReactNode;
    name?: string;
}

export const FieldValidityState = ({ name: nameProp, children }: FieldValidityStateProps) => {
    const fieldContext = useFieldContext('FieldValidityState');
    const name = nameProp ?? fieldContext.name;
    const { fieldError, isValid, isDirty, isTouched } = useFieldValidity({ name, serverInvalid: false });
    const validityMap = ((error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | undefined) =>
        ({
            required: error?.type === 'required',
            minLength: error?.type === 'minLength',
            maxLength: error?.type === 'maxLength',
            pattern: error?.type === 'pattern',
            min: error?.type === 'min',
            max: error?.type === 'max',
            validate: error?.type === 'validate',
        } as const satisfies Record<MatchOptionsKeys, boolean>))(fieldError);

    return <>{children({ validityMap, isValid: isValid && isDirty, isDirty, isTouched })}</>;
};
