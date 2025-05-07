'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components/select';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationModeProp } from './types.js';

type FieldSelectProps<Value> = React.ComponentPropsWithRef<typeof Select> & {
    registerOptions?: RegisterOptions;
    'data-testid'?: string;
    ref?: React.RefObject<React.ComponentRef<typeof Select>>;
    setValueAs?: (value: string) => Value;
    valueAs?: (value: Value) => string;
} & ValidationModeProp;

/**
 * A wrapper around the Select component connected to react-hook-form.
 * Accepts a generic type for the value that will be set in the form state.
 * The underlying Select component always has to receive and submit a string value.
 *
 * If you need to set the value as an object, you can use the `setValueAs` and `valueAs` props.
 * @param setValueAs - a select component always receives a string value, this function converts the selected value string to the desired final value.
 * @param valueAs - a function that converts the value from the form state to string that can be used as a value for the select component.
 *
 * @example
 * // set the value as an object
 * const options = [
 *     { id: '1', name: 'Apple' },
 *     { id: '2', name: 'Banana' },
 *     { id: '3', name: 'Orange' },
 * ];
 * return (
 *     <FieldSelect<{ id: string; name: string } | undefined>
 *         setValueAs={(value) => options.find((option) => option.id === value)}
 *         valueAs={(value) => value?.id ?? ''}
 *     >
 *         <FieldSelectTrigger>
 *             <FieldSelectValue placeholder="Select a fruit..." />
 *         </FieldSelectTrigger>
 *         <FieldSelectContent>
 *             {options.map((option) => (
 *                 <FieldSelectItem key={option.id} value={option.id}>
 *                     {option.name}
 *                 </FieldSelectItem>
 *             ))}
 *         </FieldSelectContent>
 *     </FieldSelect>
 * );
 */
export const FieldSelect = <Value,>({
    ref: forwardedRef,
    required,
    'data-testid': dataTestId = 'field-select',
    ValidationMode,
    setValueAs,
    valueAs,
    onValueChange,
    ...props
}: FieldSelectProps<Value>) => {
    const { name: fieldContextName, isValid } = useField();

    const { getFieldDescription } = useDescriptionIdsContext('FieldSelect');

    const name = props.name || fieldContextName;

    const { control, formState } = useFormContext();

    const { field } = useController({
        name,
        control,
        rules: {
            required,
        },
    });

    return (
        <Select
            defaultValue={field.value}
            name={name}
            onValueChange={(value: string) => {
                field.onChange({ target: { name, value: setValueAs ? setValueAs(value) : value } });
                onValueChange?.(value);
            }}
            value={valueAs ? valueAs(field.value) : field.value}
            onOpenChange={(open: boolean) => !open && field.onBlur()} //select does not provide onBlur callback - triggering blur on close
            {...renderValidityAttributes({ isValid, isSubmitted: formState.isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            {...props}
            data-testid={dataTestId}
        />
    );
};

export const FieldSelectContent: React.ComponentType<React.ComponentPropsWithRef<typeof SelectContent>> = SelectContent;

export const FieldSelectTrigger = ({
    ref,
    children,
    'data-testid': dataTestId = 'field-select-trigger',
    ...props
}: React.ComponentPropsWithRef<'button'> & { 'data-testid'?: string }) => {
    const { isValid, name, formItemId } = useField();

    const { isSubmitted } = useFormState({ name, exact: true });

    return (
        <SelectTrigger
            ref={ref}
            {...renderValidityAttributes({ isValid, isSubmitted })}
            {...props}
            data-testid={dataTestId}
            id={formItemId}
        >
            {children}
        </SelectTrigger>
    );
};

export const FieldSelectValue: React.ComponentType<React.ComponentPropsWithRef<typeof SelectValue>> = SelectValue;

export const FieldSelectItem: React.ComponentType<React.ComponentPropsWithRef<typeof SelectItem>> = SelectItem;
