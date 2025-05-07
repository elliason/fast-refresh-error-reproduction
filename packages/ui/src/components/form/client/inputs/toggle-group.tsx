'use client';

import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import { ToggleGroup, ToggleGroupItem } from '#components/toggle';
import {
    Controller,
    useFormContext,
    type FieldPath,
    type FieldValues,
    type Path,
    type RegisterOptions,
} from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationMode } from './types.js';

type ToggleGroupProps = ComponentPropsWithRef<typeof ToggleGroup> & PropsWithChildren;

type FieldToggleGroupProps<TFieldValues extends FieldValues> = {
    defaultValue?: TFieldValues[FieldPath<TFieldValues>];
    required?: boolean;
    ValidationMode?: Extract<ValidationMode, 'onChange' | 'onBlur' | 'onSubmit'>;
} & ToggleGroupProps;

export const FieldToggleGroup = <Inputs extends FieldValues>({
    children,
    required,
    ValidationMode,
    ...props
}: FieldToggleGroupProps<Inputs>) => {
    const { name, isValid } = useField();
    const { control, trigger, formState } = useFormContext();
    return (
        <Controller
            control={control}
            render={({ field }) => {
                return (
                    <ToggleGroup
                        onValueChange={(event: string[] | string) => {
                            field.onChange(event);
                            ValidationMode === 'onChange' && trigger(name as Path<Inputs>);
                        }}
                        value={field.value}
                        onBlur={() => {
                            field.onBlur();
                            ValidationMode === 'onBlur' && trigger(name as Path<Inputs>);
                        }}
                        {...renderValidityAttributes({ isValid, isSubmitted: formState.isSubmitted })}
                        {...props}
                    >
                        {children}
                    </ToggleGroup>
                );
            }}
            name={name}
            rules={{
                required,
            }}
        />
    );
};

export { ToggleGroupItem };
