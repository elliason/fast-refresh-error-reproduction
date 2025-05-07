import { useState } from 'react';
import { useAutocomplete } from '#components/autocomplete';
import { createContext } from '#lib/react';
import type { Option } from '../types.js';

export interface AutocompleteSelectContextProps {
    query: string;
    setQuery: (query: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    value?: string;
    setValue: (value: Option) => void;
    options: Option[];
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    loading: boolean;
    triggeRef: React.RefObject<HTMLButtonElement | null>;
}

const [AutocompleteSelectContextProvider, _useAutocompleteSelectContext] =
    createContext<AutocompleteSelectContextProps>('AutocompleteSelect', {} as AutocompleteSelectContextProps);

const useAutocompleteSelect = () => {
    const context = _useAutocompleteSelectContext('useAutocompleteSelectContext');
    if (!context) {
        throw new Error('useAutocompleteSelectContext must be used within AutocompleteSelectContextProvider');
    }
    return context;
};

export { useAutocompleteSelect, AutocompleteSelectContextProvider };
