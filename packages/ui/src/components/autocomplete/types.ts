import * as React from 'react';

export type UseAutocompleteGeneralProps<T> = {
    value?: T;
    query?: string;
    open?: boolean;
    delay?: number;
    deps?: React.DependencyList;
    isAllowed?: (args: {
        query: string;
        open: boolean;
        options?: T[];
        error?: unknown | null;
        value?: T;
    }) => boolean;
};

export type UseAutocompleteOnlineProps<T> = UseAutocompleteGeneralProps<T> & {
    options?: never;
    filterOptions?: never;
    getOptionsURL?: string;
};

export type UseAutocompleteOfflineProps<T> = UseAutocompleteGeneralProps<T> & {
    options?: T[];
    filterOptions?: (query: string, options: T[]) => T[];
    getOptionsURL?: never;
};

export type UseAutocompleProps<T> = UseAutocompleteOnlineProps<T> | UseAutocompleteOfflineProps<T>;
