'use client';

import * as React from 'react';
import { AutocompleteSelect } from '#components/select';
import { composeRefs } from '#lib/react';
import { useFieldSetField } from '../utils/use-field-set-field.js';

export type FieldSelectProps = React.ComponentPropsWithRef<typeof AutocompleteSelect> & { name?: string };

export const FieldSetAutocompleteSelect = (props: FieldSelectProps) => {
    const { ref: forwardedRef, name: nameFromProps } = props;

    const { name, ref, setValue } = useFieldSetField(nameFromProps);

    const composedRef = composeRefs(ref, forwardedRef);

    return <AutocompleteSelect name={name} ref={composedRef} onValueChange={setValue} {...props} />;
};
