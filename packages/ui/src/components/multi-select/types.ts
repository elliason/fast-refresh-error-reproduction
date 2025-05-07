import type { AutocompleteMultiSelectInput } from './rendering/autocomplete-multiselect.js';
import type { MultiSelectInput, MultiSelectTrigger } from './rendering/multi-select.js';

export interface Option {
    value: string;
    label: string;
}

type AutocompleteSelectUnionProps =
    | { getOptionsURL?: string; options?: never }
    | { getOptionsURL?: never; options?: Option[] };

interface AutocompleteMultiSelectRestProps {
    ref?: React.RefObject<HTMLInputElement> | ((node: HTMLInputElement) => void);
    fetchOptions?: 'allways' | 'on-search';
    notFoundMessage?: string;
    inputProps?: React.ComponentPropsWithRef<typeof AutocompleteMultiSelectInput>;
    triggerProps?: React.ComponentPropsWithRef<typeof MultiSelectTrigger>;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export type AutocompleteMultiSelectProps = AutocompleteSelectUnionProps & AutocompleteMultiSelectRestProps;

export type UseAutocompleteMultiSelectProps = {
    getOptionsURL?: string;
    options?: Option[];
} & AutocompleteMultiSelectRestProps;
