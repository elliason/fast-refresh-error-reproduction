export interface Option {
    value: string;
    label: string;
}

type AutocompleteSelectUnionProps =
    | { getOptionsURL?: string; options?: never }
    | { getOptionsURL?: never; options?: Option[] };

export interface AutocompleteSelectRestProps {
    ref?: React.RefObject<HTMLInputElement> | ((node: HTMLInputElement) => void);
    fetchOptions?: 'allways' | 'on-search';
    onQueryChange?: (query: string) => void;
}

export type AutocompleteSelectProps = AutocompleteSelectUnionProps & AutocompleteSelectRestProps;

export type UseAutocompleteSelectProps = { getOptionsURL?: string; options?: Option[] } & AutocompleteSelectRestProps;
