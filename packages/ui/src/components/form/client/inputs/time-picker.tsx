'use client';

import type { ComponentPropsWithRef } from 'react';
import { TimePicker } from '#components/time-picker';
import { cn } from '#lib/utils';
import { Controller, useFormContext, type FieldPath, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import type { ValidationMode } from './types.js';

export type TimePickerFieldProps = {
    required?: boolean;
    isValid?: boolean;
    ValidationMode?: ValidationMode;
    className?: string;
};
/**
 * TimePickerField component that integrates the TimePicker component with react-hook-form for form state management and validation.
 *
 * @component
 *
 * @param {Object} props - The properties of the TimePickerField component.
 * @param {boolean} [props.required] - If true, the field is marked as required in form validation.
 * @param {boolean} [props.isValid] - Optional flag to indicate if the field is valid.
 * @param {ValidationMode} [props.ValidationMode] - Specifies when the validation should be triggered (onChange, onBlur, etc.).
 * @param {string} [props.className] - Additional CSS classes for styling the TimePicker component.
 *
 * @returns {React.ReactElement} - A time picker input field wrapped with form control logic from react-hook-form.
 *
 * @example
 * // Example usage of the TimePickerField component
 * function MyFormComponent() {
 *
 *   return (
 *     <Form>
 *       <TimePickerField
 *         required
 *         ValidationMode="onBlur"
 *         className="my-custom-class"
 *       />
 *     </Form>
 *   );
 * }
 */

const TimePickerField = ({ ValidationMode, required, className }: TimePickerFieldProps) => {
    const { formItemId, name, isValid, isServerInvalid } = useField();
    const { control, trigger } = useFormContext();

    return (
        <Controller
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <TimePicker
                        onChange={(time) => {
                            field.onChange(time);
                            ValidationMode === 'onChange' && trigger(name);
                        }}
                        value={field.value}
                        onBlur={() => {
                            field.onBlur();
                            ValidationMode === 'onBlur' && trigger(name);
                        }}
                        className={cn(className)}
                        isValid={isValid && !isServerInvalid}
                        formItemId={formItemId}
                    />
                );
            }}
            name={name}
            rules={{
                required: required,
            }}
        />
    );
};
export default TimePickerField;
