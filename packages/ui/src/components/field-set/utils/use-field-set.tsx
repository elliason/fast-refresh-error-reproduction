'use client';

import { useFieldSetContext } from './field-set-context.js';

export const useFieldSet = () => {
    const context = useFieldSetContext('useFieldSet');
    if (!context) {
        throw new Error('useFieldSet must be used within FieldSetProvider');
    }
    return context;
};
