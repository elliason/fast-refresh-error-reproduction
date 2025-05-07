'use client';

import { useMultiSelectContext } from './multi-select-context.js';

export const useMultiSelect = () => {
    const context = useMultiSelectContext('useMultiSelect');
    if (!context) {
        throw new Error('useMultiSelect must be used within MultiSelectProvider');
    }
    return context;
};
