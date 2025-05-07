'use client';

import * as React from 'react';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectInput,
    MultiSelectItem,
    MultiSelectList,
    MultiSelectTrigger,
} from '#components/multi-select';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationMode } from './types.js';

type FieldFieldMultiSelectProps = React.ComponentPropsWithRef<typeof MultiSelect> & {
    ref?: React.RefObject<HTMLDivElement>;
    ValidationMode?: ValidationMode;
    min?: number;
    max?: number;
} & Pick<RegisterOptions, 'required'>;
export const FieldMultiSelect = ({
    ref: forwardedRef,
    children,
    required,
    min,
    max,
    ValidationMode,
    ...props
}: FieldFieldMultiSelectProps) => {
    const { name: fieldContextName, isValid } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('FieldMultiSelect');

    const name = props.name || fieldContextName;

    const { control, trigger } = useFormContext();

    const { isSubmitted } = useFormState({ name, exact: true });

    const { field } = useController({
        name,
        control,
        rules: {
            required,
            validate: (value) => {
                if (min && value.length < min) {
                    return 'minLength';
                }
                if (max && value.length > max) {
                    return 'maxLength';
                }
                return true;
            },
        },
    });

    return (
        <MultiSelect
            name={name}
            values={field.value}
            onValuesChange={(value) => {
                field.onChange({ target: { name, value } });
                ValidationMode === 'onChange' && trigger(name);
            }}
            onBlur={() => {
                field.onBlur();
                ValidationMode === 'onBlur' && trigger(name);
            }}
            {...renderValidityAttributes({ isValid, isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            {...props}
        >
            {children}
        </MultiSelect>
    );
};

export const FieldMultiSelectTrigger = ({
    ref: forwardedRef,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof MultiSelectTrigger>) => {
    const { isValid, formItemId } = useField();
    const {
        formState: { isSubmitted },
    } = useFormContext();

    return (
        <MultiSelectTrigger {...renderValidityAttributes({ isValid, isSubmitted })} {...props} id={formItemId}>
            {children}
        </MultiSelectTrigger>
    );
};

export const FieldMultiSelectInput = MultiSelectInput;

export const FieldMultiSelectContent: React.ComponentType<React.ComponentPropsWithRef<typeof MultiSelectContent>> =
    MultiSelectContent;

export const FieldMultiSelectList = MultiSelectList;

export const FieldMultiSelectItem = MultiSelectItem;
