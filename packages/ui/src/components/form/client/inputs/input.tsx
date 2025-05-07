'use client';

import * as React from 'react';
import { Input } from '#components/input';
import { type RegisterOptions } from 'react-hook-form';
import { InputControl } from './input-control.js';
import type { ValidationModeProp } from './types.js';

export type FromNativeInputProps = Pick<
    React.HTMLAttributes<HTMLInputElement>,
    'autoFocus' | 'autoCapitalize' | 'className'
> & { type?: React.HTMLInputTypeAttribute; autoComplete?: React.HTMLInputAutoCompleteAttribute; disabled?: boolean };

type BasicProps = {
    ref?: React.Ref<HTMLInputElement>;
    'data-testid'?: string;
    // TODO: do we really need this ? Investigate if we can remove it
    validationMode?: ValidationModeProp['ValidationMode'];
};
type inputFinalProps = BasicProps & RegisterOptions & FromNativeInputProps;

export const FieldInput = ({
    ref,
    'data-testid': dataTestId = 'field-input',
    type = 'text',
    autoComplete,
    autoFocus,
    autoCapitalize,
    className,
    disabled,
    validationMode,
    ...registerOptions
}: inputFinalProps) => {
    const nativeInputProps = {
        autoComplete,
        autoFocus,
        autoCapitalize,
        className,
        type,
        disabled,
    };

    const supportedNativeValidationProps = (() => {
        const min = type === 'number' && typeof registerOptions?.min === 'number' ? registerOptions?.min : undefined;
        const max = type === 'number' && typeof registerOptions?.max === 'number' ? registerOptions?.max : undefined;
        const maxLength = typeof registerOptions?.maxLength === 'number' ? registerOptions?.maxLength : undefined;
        const minLength = typeof registerOptions?.minLength === 'number' ? registerOptions?.minLength : undefined;
        return { min, max, maxLength, minLength };
    })();

    return (
        <InputControl
            ref={ref}
            registerOptions={registerOptions}
            ValidationMode={validationMode}
            data-testid={dataTestId}
            type={type}
        >
            <Input {...nativeInputProps} {...supportedNativeValidationProps} />
        </InputControl>
    );
};

FieldInput.displayName = 'FieldInput';
