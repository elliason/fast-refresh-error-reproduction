'use client';

import * as React from 'react';
import { RadioButton, RadioGroup, RadioItem, RadioLabel } from '#components/radio-group';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

export const FieldRadioGroup = ({ defaultValue, ...props }: React.ComponentPropsWithRef<typeof RadioGroup>) => {
    const { name, isValid } = useField();
    const { control } = useFormContext();
    const { getFieldDescription } = useDescriptionIdsContext('FieldRadio');

    const { isSubmitted } = useFormState({ name, exact: true });

    return (
        <Controller
            defaultValue={defaultValue}
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <RadioGroup
                        name={name}
                        {...props}
                        onValueChange={field.onChange}
                        value={field.value}
                        {...renderValidityAttributes({ isValid, isSubmitted })}
                        aria-describedby={getFieldDescription(name)}
                    />
                );
            }}
            rules={{ required: props.required }}
        />
    );
};

export const FieldRadioItem: React.ComponentType<React.ComponentPropsWithRef<typeof RadioItem>> = RadioItem;

export const FieldRadioLabel: React.ComponentType<React.ComponentPropsWithRef<typeof RadioLabel>> = RadioLabel;

export const FieldRadioButton: React.ComponentType<React.ComponentPropsWithRef<typeof RadioButton>> = RadioButton;
