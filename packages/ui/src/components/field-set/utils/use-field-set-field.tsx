import { useId, useRef } from 'react';
import { useFieldSet } from './use-field-set.js';

export const useFieldSetField = <T,>(name?: string) => {
    const id = useId();

    const fieldName = name || id;

    const ref = useRef(null);
    const { data, setData } = useFieldSet();

    return {
        name: fieldName,
        ref,
        value: data[fieldName],
        setValue: (val: T) => setData({ [fieldName]: val }),
    };
};
