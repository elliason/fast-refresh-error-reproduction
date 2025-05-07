'use client';

import * as React from 'react';
import { AutocompleteInput } from '#components/input';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

type SupportedRegisterOptions = Pick<
    RegisterOptions,
    'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'validate'
>;

type FieldAutocompleteInputProps = React.ComponentPropsWithRef<typeof AutocompleteInput> & SupportedRegisterOptions;

export const FieldAutocompleteInput = ({
    ref: forwardedRef,
    required,
    minLength,
    maxLength,
    pattern,
    min,
    max,
    validate,
    ...props
}: FieldAutocompleteInputProps) => {
    const { formItemId, name: fieldContextName, isValid } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('FieldAutocompleteInput');

    const name = props.name || fieldContextName;
    const id = props.id || formItemId;

    const { control } = useFormContext();

    const { isSubmitted } = useFormState({ name, exact: true });

    const { field } = useController({
        name,
        control,
        rules: {
            required,
            minLength,
            maxLength,
            pattern,
            min,
            max,
            validate,
        },
    });

    return (
        <AutocompleteInput
            id={id}
            name={name}
            title=""
            {...renderValidityAttributes({ isValid, isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
        />
    );
};
