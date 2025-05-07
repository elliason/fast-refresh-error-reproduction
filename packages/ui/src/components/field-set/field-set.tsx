'use client';

import { useAutocomplete } from '#components/autocomplete';
import type { FieldSetProps, FieldSetRecord } from './types.js';
import { FieldSetContextProvider } from './utils/field-set-context.js';

export const FieldSet = (props: FieldSetProps) => {
    const { children, getOptionsURL } = props;

    const { value = [], setValue, setQuery } = useAutocomplete<FieldSetRecord>({ getOptionsURL });

    const handleDataChange = (val: FieldSetRecord) => {
        setQuery(val?.toString() ?? '');
        setValue((prevData) => ({
            ...prevData,
            ...val,
        }));
    };

    return (
        <FieldSetContextProvider data={value as FieldSetRecord} setData={handleDataChange} {...props}>
            {children}
        </FieldSetContextProvider>
    );
};
