export type AutocompleteInputUnionProps =
    | { getOptionsURL?: string; options?: never }
    | { getOptionsURL?: never; options?: string[] };

export type UseAutocompleteInputProps = { getOptionsURL?: string; options?: string[] };
