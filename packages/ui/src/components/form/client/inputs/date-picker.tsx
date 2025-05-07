'use client';

import * as React from 'react';
import { DatePicker } from '#components/date-picker';
import { Controller, useFormContext, type FieldPath, type FieldValues, type Path } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import type { ValidationModeProp } from './types.js';

export type DatePickerFieldProps<TFieldValues extends FieldValues> = {
    defaultValue?: TFieldValues[FieldPath<TFieldValues>];
    required?: boolean;
    isValid?: boolean;
    className?: string;
} & Pick<React.ComponentPropsWithRef<'input'>, 'ref'> &
    ValidationModeProp;

const DatePickerField = <Inputs extends FieldValues = FieldValues>({
    'data-testid': dataTestId = 'field-datepicker',
    required,
    ref,
    ValidationMode,
    className,
    ...props
}: DatePickerFieldProps<Inputs> & {
    'data-testid'?: string;
}) => {
    const { formItemId, name } = useField();

    const { control, trigger } = useFormContext<Inputs>();

    return (
        <Controller
            control={control}
            name={name as Path<Inputs>}
            render={({ field, fieldState }) => {
                const initialDate = (() => {
                    if (field.value && typeof field.value === 'string') {
                        return new Date(field.value);
                    }
                    if (field.value && typeof field.value === 'object' && 'toDateString' in field.value) {
                        return field.value;
                    }
                    return undefined;
                })();
                return (
                    <>
                        <DatePicker
                            onDateChange={(date: Date) => {
                                field.onChange(date);
                                if (ValidationMode === 'onChange') {
                                    trigger(name as Path<Inputs>);
                                }
                            }}
                            controlledDate={initialDate ? initialDate : undefined}
                            buttonProps={{ className: className }}
                            onBlur={() => {
                                field.onBlur();
                                if (ValidationMode === 'onBlur') {
                                    trigger(name as Path<Inputs>);
                                }
                            }}
                            {...props}
                            id={formItemId}
                            isValid={!fieldState.invalid}
                        />
                    </>
                );
            }}
            defaultValue={props.defaultValue}
            // defaultValue={props.defaultValue}
            rules={{
                required: required,
            }}
        />
    );
};
export default DatePickerField;
