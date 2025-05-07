'use client';

import * as React from 'react';
import {
    Autocomplete,
    AutocompleteContent,
    AutocompleteGroup,
    AutocompleteItem,
    AutocompleteList,
    AutocompleteTrigger,
    useAutocomplete,
} from '#components/autocomplete';
import { Command, CommandEmpty, CommandItem, CommandList } from '#components/command';
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover';
import { useComposedRefs } from '#lib/react';
import { cn } from '#lib/utils';
import { AutocompleteInputContextProvider, useAutocompleteInput } from './hooks/use-autocomplete-input.js';
import { Input } from './input.js';
import type { AutocompleteInputUnionProps } from './types.js';

interface OptionItemProps {
    option: string;
    index: number;
}

type AutocompleteInputComponentProps = React.ComponentPropsWithRef<typeof Input> & AutocompleteInputUnionProps;

/**
 * Autocomplete input component
 * @param props
 * @returns
 */
const AutocompleteInput = (props: AutocompleteInputComponentProps) => {
    const { children, getOptionsURL, ...etc } = props;
    return (
        <AutocompleteInputRoot {...props}>
            <AutocompleteInputTrigger>
                <AutocompleteInputValue {...etc} />
            </AutocompleteInputTrigger>
            <AutocompleteInputContent>
                <AutocompleteInputOptions />
                <AutocompleteInputEmptyMessage>Žádné výsledky</AutocompleteInputEmptyMessage>
            </AutocompleteInputContent>
        </AutocompleteInputRoot>
    );
};

/**
 * Autocomplete input root component encapsulationg input context, popover context and command context
 * @param props
 * @returns
 */
const AutocompleteInputRoot = (props: AutocompleteInputComponentProps) => {
    const { children, getOptionsURL, options: optionsFromProps, onChange: onChangeFromProps } = props;

    const [activeIndex, setActiveIndex] = React.useState(0);

    const autocompleteProps = getOptionsURL ? { getOptionsURL } : { options: optionsFromProps };

    const {
        open,
        debouncedOpen,
        setOpen,
        options = [],
        value,
        setValue,
        query,
        debouncedQuery,
        setQuery,
    } = useAutocomplete<string>({
        ...autocompleteProps,
        isAllowed: ({ open, query, value }) => {
            //blocking the fetch if fetchOptions is set to 'on-search' and query is empty
            return open && query.length > 0 && query !== value;
        },
    });

    const innerRef = React.useRef<HTMLInputElement | null>(null);

    const handleSetOpen = (open: boolean) => {
        setOpen(open);
        setActiveIndex(0);
    };

    /**
     * Sets value to ref
     * @param value string
     */
    const setRefValue = (val: string) => {
        if (innerRef.current) {
            innerRef.current.value = val;
        }
        onChangeFromProps?.({
            target: { value: val },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSetQuery = (query: string) => {
        setQuery(query);
        setActiveIndex(0);
    };

    /**
     * Sets chosen value as state and ref - after click or enter on option from options
     * @param value string
     */
    const handleSetValue = (val: string) => {
        if (query === value) {
            return;
        }
        setValue(val);
        setQuery(val);
        setRefValue(val);
        handleSetOpen(false);
    };

    /**
     * Sets active index after hover on option or on keyboard interaction
     * @param index number
     * @returns void
     */
    const setActiveIndexViaInteraction = (index: number) => {
        setActiveIndex(index);
        setRefValue(options[index] || '');
        setValue(options[index] || '');
        innerRef.current?.setSelectionRange(innerRef.current.value.length, innerRef.current.value.length);
    };

    React.useEffect(() => {
        setOpen(query?.length > 0 && query !== value);
    }, [debouncedQuery, value]);

    return (
        <AutocompleteInputContextProvider
            {...{
                open,
                setOpen: handleSetOpen,
                options,
                value,
                setValue: handleSetValue,
                query,
                setQuery: handleSetQuery,
                activeIndex,
                setActiveIndex: setActiveIndexViaInteraction,
                innerRef,
            }}
        >
            <Autocomplete open={debouncedOpen}>{children}</Autocomplete>
        </AutocompleteInputContextProvider>
    );
};

const AutocompleteInputTrigger = (props: React.ComponentPropsWithRef<typeof PopoverTrigger>) => {
    const { children } = props;
    return (
        <AutocompleteTrigger asChild {...props}>
            {children}
        </AutocompleteTrigger>
    );
};

const AutocompleteInputValue = (props: React.ComponentPropsWithRef<'input'>) => {
    const { ref: forwardRef, className, onChange: onChangeFromProps, ...etc } = props;

    const { open, query, setOpen, innerRef, value, setQuery, options, activeIndex, setValue, setActiveIndex } =
        useAutocompleteInput();

    const combinedRef = useComposedRefs(forwardRef, innerRef);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onChangeFromProps?.(event);
    };

    /**
     * Handle keydown event
     * @param e React.KeyboardEvent<HTMLInputElement>
     */
    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowDown') {
                if (open) {
                    setActiveIndex((activeIndex + 1) % options.length || 0);
                } else {
                    setOpen(true);
                }
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                if (open) {
                    setActiveIndex((activeIndex - 1 + options.length) % options.length || 0);
                } else {
                    setOpen(true);
                }
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (open && activeIndex >= 0 && options?.[activeIndex]) {
                    setValue(options[activeIndex]);
                } else if (!open) {
                    setOpen(true);
                }
                e.preventDefault();
            } else if (e.key === 'Escape') {
                setOpen(false);
                e.preventDefault();
            }
            e.stopPropagation();
        },
        [open, activeIndex, options]
    );

    React.useEffect(() => {
        onChangeFromProps?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    }, [value, onChangeFromProps]);

    return (
        <Input
            {...etc}
            className={cn(className)}
            id="input-component"
            type="text"
            ref={combinedRef}
            autoComplete="off" //disabling browser autocomplete
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setOpen(false)}
            onFocus={() => query?.length > 0 && setOpen(true)}
        />
    );
};

const AutocompleteInputContent = (props: React.ComponentPropsWithRef<typeof PopoverContent>) => {
    const { children, ...etc } = props;

    const { setOpen } = useAutocompleteInput();

    return (
        <AutocompleteContent onPointerDownOutside={(e: Event) => setOpen(false)} {...etc}>
            {children}
        </AutocompleteContent>
    );
};

const AutocompleteInputOptions = (props: React.ComponentPropsWithRef<typeof CommandList>) => {
    const { children, ...etc } = props;

    const { options } = useAutocompleteInput();

    return (
        <AutocompleteList {...etc} onMouseDown={(e) => e.preventDefault()}>
            <AutocompleteGroup>
                {options.map((option, idx) => (
                    <AutocompleteInputItem key={option} option={option} index={idx} />
                ))}
                {children}
            </AutocompleteGroup>
        </AutocompleteList>
    );
};

const AutocompleteInputEmptyMessage = CommandEmpty;

/**
 * Option item component
 * @param props OptionItemProps
 * @returns
 */
const AutocompleteInputItem = ({ option, index }: OptionItemProps) => {
    const { open, options, activeIndex, setValue, setActiveIndex } = useAutocompleteInput();

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const isActive = index === activeIndex;
        if (ref.current) {
            //scrolling to active item
            //setting aria-selected attribute programmatically - simply passing aria-selected prop does not work
            if (isActive) {
                ref.current.scrollIntoView({ block: 'nearest' });
                ref.current.setAttribute('aria-selected', 'true');
            } else {
                ref.current.setAttribute('aria-selected', 'false');
            }
        }
    }, [activeIndex, options, open]);

    return (
        <AutocompleteItem
            ref={ref}
            value={option}
            onSelect={() => setValue(option)}
            onPointerEnter={() => setActiveIndex(index)}
        >
            {option}
        </AutocompleteItem>
    );
};

export {
    AutocompleteInput,
    AutocompleteInputRoot,
    AutocompleteInputTrigger,
    AutocompleteInputContent,
    AutocompleteInputOptions,
    AutocompleteInputEmptyMessage,
    AutocompleteInputValue,
    AutocompleteInputRoot as Root,
    AutocompleteInputTrigger as Trigger,
    AutocompleteInputContent as Content,
    AutocompleteInputOptions as Options,
    AutocompleteInputEmptyMessage as EmptyMessage,
    AutocompleteInputValue as Input,
};
