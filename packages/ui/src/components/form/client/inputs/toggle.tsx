'use client';

import { type ComponentPropsWithRef } from 'react';
import { Toggle } from '#components/toggle';
import { Controller, useFormContext, type FieldPath, type FieldValues, type Path } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import type { ValidationMode } from './types.js';

type ToggleFieldProps<TFieldValues extends FieldValues> = {
    defaultValue?: TFieldValues[FieldPath<TFieldValues>];
    required?: boolean;
    ValidationMode?: Extract<ValidationMode, 'onChange' | 'onBlur' | 'onSubmit'>;
} & ComponentPropsWithRef<typeof Toggle>;

export const FieldToggle = <Inputs extends FieldValues>({
    'data-testid': dataTestId = 'field-toggle',
    required,
    ref,
    ValidationMode = 'onChange',
    ...props
}: ToggleFieldProps<Inputs> & {
    'data-testid'?: string;
}) => {
    const { name } = useField();
    const { control, trigger } = useFormContext<Inputs>();

    return (
        <Controller
            control={control}
            name={name as Path<Inputs>}
            render={({ field }) => {
                return (
                    <Toggle
                        ref={ref}
                        {...props}
                        name={name}
                        pressed={field.value}
                        onPressedChange={(state) => {
                            field.onChange(state);
                            ValidationMode === 'onChange' && trigger(name as Path<Inputs>);
                        }}
                        onBlur={field.onBlur}
                    />
                );
            }}
            rules={{
                required,
            }}
        />
    );
};
