'use client';

import { type ComponentPropsWithRef, type FC, type PropsWithChildren } from 'react';
import { CheckboxGroup, CheckboxGroupItem } from '#components/checkbox-group';
import { Controller, useFormContext, type FieldPath, type FieldValues, type Path } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationMode } from './types.js';

type CheckboxGroupProps = ComponentPropsWithRef<typeof CheckboxGroup> & PropsWithChildren;

type FieldCheckboxGroupProps = {
    // eslint-disable-next-line react/boolean-prop-naming
    required?: boolean;
    ValidationMode?: Extract<ValidationMode, 'onChange' | 'onBlur' | 'onSubmit'>;
} & CheckboxGroupProps;

export const FieldCheckboxGroup: FC<FieldCheckboxGroupProps> = ({ children, required, ValidationMode, ...props }) => {
    const { name, isValid } = useField();
    const { control, trigger, formState } = useFormContext();
    return (
        <Controller
            control={control}
            render={({ field }) => {
                return (
                    <CheckboxGroup
                        onValueChange={(event: string[]) => {
                            field.onChange(event);

                            if (ValidationMode === 'onChange') {
                                trigger(name);
                            }
                        }}
                        value={field.value}
                        onBlur={() => {
                            console.log('blur');
                            field.onBlur();

                            if (ValidationMode === 'onBlur') {
                                trigger(name);
                            }
                        }}
                        {...renderValidityAttributes({ isValid, isSubmitted: formState.isSubmitted })}
                        {...props}
                    >
                        {children}
                    </CheckboxGroup>
                );
            }}
            name={name}
            rules={{
                required,
            }}
        />
    );
};

export { CheckboxGroupItem };
