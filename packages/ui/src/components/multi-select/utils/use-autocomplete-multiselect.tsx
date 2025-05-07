import { createContext } from '#lib/react';
import type { Option } from '../types.js';

export interface AutocompleteMultiSelectContextProps {
    query: string;
    setQuery: (query: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string[];
    setValue: (value: string[]) => void;
    options: Option[];
}

const [AutocompleteMultiSelectContextProvider, _useAutocompleteMultiSelectContext] =
    createContext<AutocompleteMultiSelectContextProps>(
        'AutocompleteMultiSelect',
        {} as AutocompleteMultiSelectContextProps
    );

const useAutocompleteMultiSelect = () => {
    const context = _useAutocompleteMultiSelectContext('useAutocompleteMultiSelectContext');
    if (!context) {
        throw new Error('useAutocompleteMultiSelectContext must be used within AutocompleteMultiSelectContextProvider');
    }
    return context;
};

export { useAutocompleteMultiSelect, AutocompleteMultiSelectContextProvider };
