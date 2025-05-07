'use client';

import { createContext } from '#lib/react';

export interface FieldContextValue {
    name: string;
    id: string;
    isValid: boolean | undefined;
    isDirty: boolean;
    isServerInvalid: boolean;
}

const [FieldContextProvider, useFieldContext] = createContext<FieldContextValue>('FormField', {} as FieldContextValue);

export { useFieldContext, FieldContextProvider };

export const useField = () => {
    const { id, isValid, isDirty, isServerInvalid, name } = useFieldContext('useField');
    return {
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        isValid,
        isServerInvalid,
        isDirty,
        name,
    };
};
