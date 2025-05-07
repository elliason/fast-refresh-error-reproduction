import { createContext } from '#lib/react';

export interface AutocompleteInputContextProps {
    options: string[];
    value?: string;
    setValue: (value: string) => void;
    query: string;
    setQuery: (query: string) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    innerRef: React.RefObject<HTMLInputElement | null>;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const [AutocompleteInputContextProvider, _useAutocompleteInputContext] = createContext<AutocompleteInputContextProps>(
    'AutocompleteInput',
    {} as AutocompleteInputContextProps
);

const useAutocompleteInput = () => {
    const context = _useAutocompleteInputContext('useAutocompleteInputContext');
    if (!context) {
        throw new Error('useAutocompleteInputContext must be used within AutocompleteInputContextProvider');
    }
    return context;
};

export { useAutocompleteInput, AutocompleteInputContextProvider };
