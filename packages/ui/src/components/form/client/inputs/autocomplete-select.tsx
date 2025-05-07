'use client';

import * as React from 'react';
import { AutocompleteSelect } from '#components/select';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';
import type { ValidationModeProp } from './types.js';

type FieldAutocompleteSelectProps = React.ComponentPropsWithRef<typeof AutocompleteSelect> & {
    registerOptions?: RegisterOptions;
    'data-testid'?: string;
} & ValidationModeProp;

export const FieldAutocompleteSelect = ({
    ref: forwardedRef,
    required,
    'data-testid': dataTestId = 'field-select',
    ValidationMode,
    ...props
}: FieldAutocompleteSelectProps) => {
    const { name: fieldContextName, isValid, formItemId } = useField();

    const { getFieldDescription } = useDescriptionIdsContext('FieldAutocompleteSelect');

    const name = props.name || fieldContextName;

    const { control } = useFormContext();

    const { isSubmitted } = useFormState({ name, exact: true });

    const { field } = useController({
        name,
        control,
        rules: {
            required,
        },
    });

    const validityAtributes = renderValidityAttributes({ isValid, isSubmitted });

    return (
        <AutocompleteSelect
            name={name}
            onValueChange={(value: string) => field.onChange({ target: { name, value } })}
            onOpenChange={(open: boolean) => !open && field.onBlur()} //select does not provide onBlur callback - triggering blur on close
            {...validityAtributes}
            triggerProps={{ ...validityAtributes, id: formItemId }}
            aria-describedby={getFieldDescription(name)}
            {...props}
            data-testid={dataTestId}
        />
    );
};
