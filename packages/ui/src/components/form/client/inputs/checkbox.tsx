'use client';

import * as React from 'react';
import { Checkbox } from '#components/checkbox';
import { useComposedRefs } from '#lib/react';
import { useController, useFormContext, useFormState, type RegisterOptions } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

type FieldCheckboxProps = React.ComponentPropsWithRef<typeof Checkbox> & { 'data-testid'?: string } & Pick<
        RegisterOptions,
        'required'
    >;

export const FieldCheckbox = ({
    ref: forwardedRef,
    required,
    'data-testid': dataTestId = 'field-checkbox',
    ...props
}: FieldCheckboxProps) => {
    const { formItemId, name: fieldContextName, isValid } = useField();

    const { getFieldDescription } = useDescriptionIdsContext('FieldCheckbox');

    const name = props.name || fieldContextName;
    const id = props.id || formItemId;

    const { control } = useFormContext();

    const { isSubmitted } = useFormState({ name, exact: true });

    const { field } = useController({
        name,
        control,
        rules: {
            required,
        },
    });

    const composedRef = useComposedRefs(field.ref, forwardedRef);

    return (
        <Checkbox
            id={id}
            ref={composedRef} // this is ref to the button
            name={name}
            onCheckedChange={(checked) => {
                field.onChange(checked);
            }}
            onBlur={() => {
                field.onBlur();
            }}
            checked={field.value}
            // inputRef={composedInputRef} // this is ref to the actual input
            {...renderValidityAttributes({ isValid, isSubmitted })}
            aria-describedby={getFieldDescription(name)}
            // disable default browser behaviour of showing built-in error message on hover
            title=""
            {...props}
            data-testid={dataTestId}
        />
    );
};
