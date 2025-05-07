'use client';

import { Textarea } from '#components/textarea';
import {
    useController,
    useFormContext,
    useFormState,
    type FieldValues,
    type RegisterOptions,
    type ValidationRule,
} from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationMode } from './types.js';

type FieldTextareaProps = {
    required?: boolean;
    ValidationMode?: ValidationMode;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: ValidationRule<RegExp>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};
/**
 * TextareaField component integrates a text area with form validation using `react-hook-form`.
 *
 * It leverages the `useController` and `useFormContext` hooks to handle form state and validation,
 * and the `useField` hook to get the field's name. The `ValidationMode` prop determines when the validation
 * is triggered (on change or on blur).
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} [props.required=false] - Determines if the textarea field is required.
 * @param {ValidationMode} [props.ValidationMode] - Determines the validation mode, e.g., 'onChange' or 'onBlur'.
 *
 * @returns {React.ReactElement} The rendered TextareaField component.
 *
 * @example
 * // Example usage of TextareaField component
 * function MyForm() {
 *   return (
 *     <Form>
 *       // Must be wrapped in a Form component
 *       <TextareaField required ValidationMode="onBlur" />
 *     </Form>
 *   );
 * }
 */
export const TextareaField = ({
    required,
    ValidationMode,
    disabled,
    minLength,
    maxLength,
    pattern,
    onKeyDown,
}: FieldTextareaProps): React.ReactElement => {
    const { name, formItemId } = useField();
    const { register, trigger } = useFormContext();

    const validationRules: Partial<RegisterOptions> = {
        required,
    };

    if (minLength) {
        validationRules.minLength = minLength;
    }

    if (maxLength) {
        validationRules.maxLength = maxLength;
    }

    if (pattern) {
        validationRules.pattern = pattern;
    }

    const { onChange, onBlur, ref } = register(name, {
        ...validationRules,
    });
    const { fieldState } = useController({ name });
    const { isSubmitted } = useFormState({ name, exact: true });
    return (
        <Textarea
            {...register(name)}
            onChange={(event) => {
                onChange(event);
                ValidationMode === 'onChange' && trigger(name);
            }}
            onBlur={(event) => {
                onBlur(event);
                ValidationMode === 'onBlur' && trigger(name);
            }}
            disabled={disabled}
            ref={ref}
            id={formItemId}
            {...renderValidityAttributes({ isValid: !fieldState.invalid, isSubmitted })}
            onKeyDown={onKeyDown}
        />
    );
};
