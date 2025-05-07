'use client';

import { useState } from 'react';
import { useAutocomplete } from '#components/autocomplete';
import { CommandEmpty, CommandGroup, CommandList } from '#components/command';
import type { AutocompleteMultiSelectProps, Option } from '../types.js';
import {
    AutocompleteMultiSelectContextProvider,
    useAutocompleteMultiSelect,
} from '../utils/use-autocomplete-multiselect.js';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectInput,
    MultiSelectItem,
    MultiSelectTrigger,
} from './multi-select.js';

type AutocompleteMultiSelectComponentProps = React.ComponentPropsWithRef<typeof MultiSelect> &
    AutocompleteMultiSelectProps;

const AutocompleteMultiSelect = (props: AutocompleteMultiSelectComponentProps) => {
    const { inputProps = {}, triggerProps = {}, ...restProps } = props;

    return (
        <AutocompleteMultiSelectRoot {...restProps}>
            <AutocompleteMultiSelectTrigger {...triggerProps}>
                <AutocompleteMultiSelectInput {...inputProps} />
            </AutocompleteMultiSelectTrigger>
            <AutocompleteMultiSelectContent>
                <AutocompleteMultiSelectOptions>
                    <AutocompleteMultiSelectEmptyMessage />
                </AutocompleteMultiSelectOptions>
            </AutocompleteMultiSelectContent>
        </AutocompleteMultiSelectRoot>
    );
};

const AutocompleteMultiSelectRoot = (props: AutocompleteMultiSelectComponentProps) => {
    const {
        getOptionsURL,
        options: optionsFromProps,
        fetchOptions = 'allways', //options fetch after a popover is opened
        notFoundMessage = 'Žádné výsledky',
        inputProps = {},
        triggerProps = {},
        children,
        onValuesChange: onValuesChangeFromProps,
        ...restProps
    } = props;

    const autocompleteProps = getOptionsURL ? { getOptionsURL } : { options: optionsFromProps };

    // multiselect uses its own proprietary value pattern
    const [value, setValue] = useState<string[]>([]);

    //fetching new options only if query is not empty or fetchOptions is set to 'allways'
    const isAllowed = (query: string, open: boolean) => open && (fetchOptions === 'allways' || query?.length > 0);

    const {
        open,
        debouncedOpen,
        setOpen,
        options = [],
        query,
        setQuery,
    } = useAutocomplete<Option>({
        ...autocompleteProps,
        isAllowed: ({ query, open }) => isAllowed(query, open),
    });

    const handleSetValue = (value: string[]) => {
        setValue(value);
        setQuery('');
        onValuesChangeFromProps?.(value);
    };

    return (
        <AutocompleteMultiSelectContextProvider {...{ open, setOpen, value, setValue, query, setQuery, options }}>
            <MultiSelect
                {...restProps}
                values={value}
                onValuesChange={handleSetValue}
                inputValue={query}
                onInputValueChange={setQuery}
                open={debouncedOpen}
                onOpenChange={setOpen}
                shouldFilter={false} //overriding default command filtering behavior - autocomplete implements its own filtering
            >
                {children}
            </MultiSelect>
        </AutocompleteMultiSelectContextProvider>
    );
};

const AutocompleteMultiSelectTrigger: React.ComponentType<React.ComponentPropsWithRef<typeof MultiSelectTrigger>> =
    MultiSelectTrigger;
const AutocompleteMultiSelectContent: React.ComponentType<React.ComponentPropsWithRef<typeof MultiSelectContent>> =
    MultiSelectContent;

const AutocompleteMultiSelectOptions = (props: React.ComponentPropsWithRef<typeof CommandList>) => {
    const { children, ...restProps } = props;
    const { options = [] } = useAutocompleteMultiSelect();
    return (
        <CommandList {...restProps} onMouseDown={(e) => e.preventDefault()}>
            <CommandGroup>
                {options.map((option) => (
                    <MultiSelectItem key={option.value} value={option.value}>
                        {option.label}
                    </MultiSelectItem>
                ))}
                {children}
            </CommandGroup>
        </CommandList>
    );
};

const AutocompleteMultiSelectEmptyMessage = (props: React.ComponentPropsWithRef<typeof CommandEmpty>) => {
    const { children, ...restProps } = props;
    const { query } = useAutocompleteMultiSelect();
    return (
        <CommandEmpty {...restProps}>
            <span className="text-muted-foreground">{query.length > 0 ? 'Žádné výsledky' : 'Vyhledejte možnosti'}</span>
            {children}
        </CommandEmpty>
    );
};

const AutocompleteMultiSelectInput = MultiSelectInput;

export {
    AutocompleteMultiSelect,
    AutocompleteMultiSelectRoot,
    AutocompleteMultiSelectTrigger,
    AutocompleteMultiSelectContent,
    AutocompleteMultiSelectOptions,
    AutocompleteMultiSelectEmptyMessage,
    AutocompleteMultiSelectInput,
    AutocompleteMultiSelectRoot as Root,
    AutocompleteMultiSelectTrigger as Trigger,
    AutocompleteMultiSelectContent as Content,
    AutocompleteMultiSelectOptions as Options,
    AutocompleteMultiSelectEmptyMessage as EmptyMessage,
    AutocompleteMultiSelectInput as Input,
};
