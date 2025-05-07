'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Popover, Popover as PopoverPrimitive } from 'radix-ui';
import {
    AutocompleteContent,
    AutocompleteTrigger,
    useAutocomplete,
    type UseAutocompleProps,
} from '#components/autocomplete';
import { Command, CommandEmpty, CommandItem, CommandList } from '#components/command';
import { PopoverTrigger } from '#components/popover';
import { useComposedRefs } from '#lib/react';
import { cn } from '#lib/utils';
import * as CommandPrimitive from 'cmdk';
import { CheckIcon } from 'lucide-react';
import { Select, SelectContent, SelectTrigger } from './select.js';
import type { AutocompleteSelectRestProps, Option } from './types.js';
import { AutocompleteSelectContextProvider, useAutocompleteSelect } from './utils/use-autocomplete-select.js';

type AutocompleteSelectComponentProps = React.ComponentPropsWithRef<typeof Select> &
    AutocompleteSelectRestProps &
    Omit<UseAutocompleProps<Option>, 'value'> & {
        triggerProps?: React.ComponentPropsWithRef<typeof PopoverTrigger>;
        inputProps?: React.ComponentPropsWithRef<typeof AutocompleteSelectInput>;
    };

type AutocompleteSelectItemProps = {
    option: Option;
    index: number;
};

/**
 * AutocompleteSelect component implementation
 * @param props AutocompleteSelectComponentProps
 */
const AutocompleteSelect = (props: AutocompleteSelectComponentProps) => {
    const { inputProps = {}, triggerProps = {}, ...etc } = props;
    return (
        <AutocompleteSelectRoot {...etc}>
            <AutocompleteSelectTrigger {...triggerProps}>
                <AutocompleteSelectInput {...inputProps} />
            </AutocompleteSelectTrigger>
            <AutocompleteSelectContent>
                <AutocompleteSelectOptions />
                <AutocompleteSelectEmptyMessage />
            </AutocompleteSelectContent>
        </AutocompleteSelectRoot>
    );
};

/**
 * Root component for autocomplete select encapsulationg autocomplete select context, select context and command context
 * @param props
 * @returns
 */
const AutocompleteSelectRoot = (props: AutocompleteSelectComponentProps) => {
    const {
        ref,
        getOptionsURL,
        options: optionsFromProps,
        onValueChange,
        onQueryChange,
        onOpenChange,
        fetchOptions = 'allways', //options fetch after a search string is entered
        triggerProps = {},
        children,
        value: valueFromProps,
        ...restProps
    } = props;

    const autocompleteProps = getOptionsURL ? { getOptionsURL } : { options: optionsFromProps };

    const [activeIndex, setActiveIndex] = useState(0);

    // select uses its own proprietary value pattern
    const [value, setValue] = useState<string>('');

    const {
        open,
        debouncedOpen,
        setOpen,
        options = [],
        query,
        loading,
        setQuery,
    } = useAutocomplete<Option>({
        ...autocompleteProps,
        isAllowed: ({ query, open }) => {
            //fetching new options only if query is not empty or fetchOptions is set to 'allways'
            if (!open) {
                return false;
            }
            if (fetchOptions === 'allways') {
                return true;
            }
            return query?.length > 0;
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const triggeRef = useRef<HTMLButtonElement>(null);

    const handleSetQuery = (query: string) => {
        setQuery(query);
        onQueryChange?.(query);
        setActiveIndex(0);
    };

    const handleSetValue = (option: Option) => {
        setValue(option?.value);
        onValueChange?.(option?.value);
        handleSetQuery('');
        setOpen(false);
        triggeRef.current?.focus();
    };

    useEffect(() => {
        if (valueFromProps) {
            setValue(valueFromProps);
        }
    }, [valueFromProps]);

    /**
     * Handle keydown event
     * @param e React.KeyboardEvent<HTMLInputElement>
     */
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key) && !debouncedOpen) {
                setOpen(true);
                e.preventDefault();
            } else if (e.key === 'Escape') {
                setOpen(false);
                e.preventDefault();
            }
            e.stopPropagation();
        },
        [open, activeIndex, options]
    );
    return (
        <AutocompleteSelectContextProvider
            {...{
                open: debouncedOpen,
                debouncedOpen,
                setOpen,
                value,
                query,
                setQuery: handleSetQuery,
                options,
                setValue: handleSetValue,
                activeIndex,
                setActiveIndex,
                inputRef,
                triggeRef,
                loading,
            }}
        >
            <PopoverPrimitive.Root open={open ? debouncedOpen : open} {...restProps}>
                <Command
                    onKeyDown={handleKeyDown}
                    className={cn('flex flex-col overflow-visible bg-transparent focus:outline-none')}
                    shouldFilter={false}
                >
                    {children}
                    {!open && <CommandList></CommandList>}
                </Command>
            </PopoverPrimitive.Root>
        </AutocompleteSelectContextProvider>
    );
};

const AutocompleteSelectTrigger = (props: React.ComponentPropsWithRef<typeof SelectTrigger>) => {
    const { children, className, ref: forwardedRef, ...etc } = props;
    const innerRef = useRef<HTMLButtonElement>(null);
    const { triggeRef, open, setOpen } = useAutocompleteSelect();
    const composedRef = useComposedRefs(triggeRef, forwardedRef, innerRef);
    return (
        <AutocompleteTrigger
            tabIndex={open ? -1 : 0} //setting tabIndex to -1 when open for correct shift+tab behavior
            ref={composedRef}
            onClick={() => setOpen(!open)}
            className={cn(
                'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid=true]:border-destructive bg-input-background min-h-10 flex w-full items-center gap-1 rounded-md border px-3 py-2 text-base shadow-inner file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...etc}
        >
            {children}
        </AutocompleteTrigger>
    );
};

/**
 * Input component for autocomplete select enabling search a and displaying selected value
 * @param props AutocompleteInputProps
 */
const AutocompleteSelectInput = (
    props: React.ComponentPropsWithRef<typeof CommandPrimitive.CommandInput> & {
        searchPlaceholder?: string;
        formItemId?: string;
        type?: 'text' | 'number';
        inputPattern?: RegExp;
    }
) => {
    const {
        children,
        ref: forwardedFef,
        className,
        searchPlaceholder: searchPlaceholderFromProps,
        placeholder: placeholderFromProps,
        type = 'text',
        inputPattern,
        ...etc
    } = props;
    const {
        inputRef,
        triggeRef,
        value,
        query,
        setQuery,
        open,
        setOpen,
        activeIndex,
        setActiveIndex,
        options,
        setValue,
    } = useAutocompleteSelect();

    const innerRef = useRef<HTMLInputElement>(null);
    const composedRef = useComposedRefs(inputRef, forwardedFef, innerRef);

    /**
     * Custom handling of keyboard interactions in command because SelectContent breaks the default Command behavior
     * @param e React.KeyboardEvent<HTMLInputElement>
     * @returns void
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((activeIndex + 1) % options.length || 0);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((activeIndex - 1 + options.length) % options.length || 0);
        } else if (e.key === 'Enter' && activeIndex >= 0 && options?.[activeIndex]) {
            e.preventDefault();
            setValue(options[activeIndex]);
        } else if (e.key === 'Escape') {
            triggeRef.current?.focus();
            e.preventDefault();
        }
    };

    const placeholder = placeholderFromProps ?? '- vyberte položku -';
    const searchPlaceholder = searchPlaceholderFromProps ?? 'Hledejte položky';

    useEffect(() => {
        if (open) {
            innerRef.current?.focus();
        }
    }, [open]);

    if (!open) {
        return value || placeholder;
    }

    return (
        <CommandPrimitive.CommandInput
            tabIndex={-1}
            className={cn(
                'placeholder:text-muted-foreground flex w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            onKeyDown={handleKeyDown}
            onBlur={() => setOpen(false)}
            ref={composedRef}
            value={query}
            onValueChange={(search) => {
                console.log(search, inputPattern?.test(search));
                if (search === '' || inputPattern?.test(search)) {
                    setQuery(search);
                }
            }}
            placeholder={searchPlaceholder}
            {...etc}
        />
    );
};
/**
 * Rendering content for autocomplete select
 * @param props CommandContentProps
 */
const AutocompleteSelectContent = (props: React.ComponentPropsWithRef<typeof SelectContent>) => {
    const { children, ...etc } = props;
    const { inputRef, loading } = useAutocompleteSelect();
    return (
        <AutocompleteContent
            hidden={loading}
            onFocus={(event) => {
                //preventing select content stealing focus from CommandInput
                event.preventDefault();
                event.stopPropagation();
                inputRef?.current?.focus();
            }}
            {...etc}
        >
            {children}
        </AutocompleteContent>
    );
};

/**
 * Rendering options list for autocomplete select
 * @param props CommandListProps
 */
const AutocompleteSelectOptions = (props: React.ComponentPropsWithRef<typeof CommandList>) => {
    const { children, ...etc } = props;
    const { options = [] } = useAutocompleteSelect();

    return (
        <CommandList {...etc} onMouseDown={(e) => e.preventDefault()}>
            {options?.map((option, index) => (
                <AutocompleteSelectItem key={option.label} option={option} index={index} />
            ))}
            {children}
        </CommandList>
    );
};

/**
 * Empty message component
 * @param props CommandEmptyProps
 */
const AutocompleteSelectEmptyMessage = (props: React.ComponentPropsWithRef<typeof CommandEmpty>) => {
    const { children, ...etc } = props;
    const { query } = useAutocompleteSelect();
    return (
        <CommandEmpty {...etc}>
            <span className="text-muted-foreground">{query.length > 0 ? 'Žádné výsledky' : 'Vyhledejte možnosti'}</span>
            {children}
        </CommandEmpty>
    );
};

/**
 * Option item component
 * @param props OptionItemProps
 * @returns
 */
const AutocompleteSelectItem = ({ option, index }: AutocompleteSelectItemProps) => {
    const { open, options, value, activeIndex, setActiveIndex, setValue } = useAutocompleteSelect();

    const ref = useRef<HTMLDivElement>(null);
    const selected = value === option.value;

    useEffect(() => {
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
        <CommandItem
            ref={ref}
            key={option.label}
            value={option.label}
            onPointerEnter={() => setActiveIndex(index)}
            onSelect={() => setValue(option)}
        >
            <CheckIcon className={cn('mr-2 h-4 w-4', selected ? 'opacity-100' : 'opacity-0')} />
            {option.label}
        </CommandItem>
    );
};

export {
    AutocompleteSelect,
    AutocompleteSelectRoot,
    AutocompleteSelectTrigger,
    AutocompleteSelectContent,
    AutocompleteSelectOptions,
    AutocompleteSelectEmptyMessage,
    AutocompleteSelectInput,
    AutocompleteSelectRoot as Root,
    AutocompleteSelectTrigger as Trigger,
    AutocompleteSelectContent as Content,
    AutocompleteSelectOptions as Options,
    AutocompleteSelectEmptyMessage as EmptyMessage,
    AutocompleteSelectInput as Input,
};
