'use client';

import * as React from 'react';
import { AutocompleteMultiSelect } from '#components/multi-select';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

type FieldAutocompleteMultiSelectProps = React.ComponentPropsWithRef<typeof AutocompleteMultiSelect> & {
    ref?: React.RefObject<HTMLDivElement>;
} & Pick<RegisterOptions, 'required'>;

export const FieldAutocompleteMultiSelect = ({
    ref: forwardedRef,
    required,
    ...props
}: FieldAutocompleteMultiSelectProps) => {
    //const [data, setData] = React.useState<string[]>([]);
    const { name: fieldContextName, isValid, formItemId } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('FieldAutocompleteMultiSelect');

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
        <AutocompleteMultiSelect
            name={name}
            //values={data}
            onValuesChange={(value) => {
                field.onChange({ target: { name, value } });
            }}
            onBlur={() => {
                field.onBlur();
            }}
            {...validityAtributes}
            aria-describedby={getFieldDescription(name)}
            triggerProps={{ ...validityAtributes, id: formItemId }}
            {...props}
        />
    );
};
