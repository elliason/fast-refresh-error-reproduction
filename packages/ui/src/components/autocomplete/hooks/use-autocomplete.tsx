import { useCallback, useState } from 'react';
import { useAbortable, useDebouncedValue } from '#lib/react';
import type { UseAutocompleProps, UseAutocompleteOfflineProps, UseAutocompleteOnlineProps } from '../types.js';

/**
 * Holds a state and debounced state for autocomplete hooks
 * @param {number} delay 
 * @returns {object} {
        query,
        setQuery,
        value,
        setValue,
        open,
        setOpen,
        debouncedValue,
        debouncedQuery,
        debouncedOpen
    }
    @example
    const { query, setQuery, value, setValue, open, setOpen, debouncedValue, debouncedQuery, debouncedOpen } = useAutocompleteState(delay);
 */
export const useAutocompleteState = <T,>(delay: number = 200, deps: React.DependencyList = []) => {
    const [query, setQuery] = useState('');
    const [value, setValue] = useState<T>();
    const [open, setOpen] = useState(false);

    const debouncedQuery = useDebouncedValue(query, delay);
    const debouncedValue = useDebouncedValue(value, delay);
    const debouncedOpen = useDebouncedValue(open, delay);

    const debouncedDeps = useDebouncedValue(deps, delay);

    return {
        query,
        setQuery,
        value,
        setValue,
        open,
        setOpen,
        debouncedValue,
        debouncedQuery,
        debouncedOpen,
        debouncedDeps,
    };
};

/**
 * Either fetches options from API or filters them from the provided options array after a debounce
 * @param {string} props.getOptionsURL {string} URL to fetch options from
 * @param {function} props.isAllowed {function} Callback to determine if the fetch request should be made
 * @param {Array} props.options {Array} Array of options to filter from
 * @param {function} props.filterOptions {function} Callback to filter options
 * @param {number} props.delay {number} Debounce delay
 * @returns {object} { query, setQuery, options, error, value, setValue, open, setOpen }
    @example
    const { query, setQuery, options, error, value, setValue, open, setOpen } = useAutocomplete<string>({
        getOptionsURL: "options",
        isAllowed: ({ options, query, error, value, open }) => value !== query,
    });
    @example
    const { query, setQuery, options, value, setValue, open, setOpen } = useAutocomplete<Record<string, string>>({
        options: [{ value: 'option1' }, { value: 'option2' }],
        filterOptions: (query, options) => options.filter(option => option.value.includes(query)),
        delay: 100
    });
*/
export const useAutocomplete = <T,>(props: UseAutocompleProps<T>) => {
    const { getOptionsURL, isAllowed, options, filterOptions, delay, deps = [] } = props;

    const {
        query,
        setQuery,
        value,
        setValue,
        open,
        setOpen,
        debouncedQuery,
        debouncedOpen,
        debouncedValue,
        debouncedDeps,
    } = useAutocompleteState<T>(delay, deps);

    const { options: offlineOptions } = useFilterAutocompleteOptions<T>({
        options,
        filterOptions,
        isAllowed,
        query: debouncedQuery,
        open: debouncedOpen,
        deps: debouncedDeps,
    });

    const {
        options: onlineOptions,
        error,
        loading,
    } = useFetchAutocompleteOptions<T>({
        getOptionsURL,
        isAllowed,
        query: debouncedQuery,
        value: debouncedValue,
        open: debouncedOpen,
        deps: debouncedDeps,
    });

    const realOptions = getOptionsURL ? onlineOptions : offlineOptions;

    return {
        options: realOptions,
        query,
        setQuery,
        error,
        loading,
        value,
        setValue,
        open,
        setOpen,
        deps,
        debouncedQuery,
        debouncedOpen,
        debouncedValue,
        debouncedDeps,
    };
};

/**
 * Fetches options from API after a debounce
 * @param {object} props 
 * @returns {object} {
        options,
        error
    }
    @example
    const { options, error } = useFetchAutocompleteOptions({
        getOptionsURL,
        isAllowed,
        query,
        open
    });
 */
export const useAutocompleteOnline = <T,>(props: UseAutocompleteOnlineProps<T>) => {
    const { getOptionsURL, isAllowed, delay, deps = [] } = props;

    const {
        query,
        setQuery,
        value,
        setValue,
        open,
        setOpen,
        debouncedQuery,
        debouncedOpen,
        debouncedValue,
        debouncedDeps,
    } = useAutocompleteState<T>(delay, deps);

    const { options, error, loading } = useFetchAutocompleteOptions<T>({
        getOptionsURL,
        isAllowed,
        query: debouncedQuery,
        value: debouncedValue,
        open: debouncedOpen,
        deps: debouncedDeps,
    });

    return {
        query,
        setQuery,
        options,
        error,
        loading,
        value,
        setValue,
        open,
        setOpen,
        debouncedQuery,
        debouncedOpen,
        debouncedValue,
        debouncedDeps,
    };
};

/**
 * Filters options from the provided options array after a debounce
 * @param {object} props 
 * @returns {object} {
        query,
        setQuery,
        options,
        value,
        setValue,
        open,
        setOpen
    }
    @example
    const { query, setQuery, options, value, setValue, open, setOpen } = useAutocompleteOffline({
        options,
        filterOptions,
        delay
    });
 */
export const useAutocompleteOffline = <T,>(props: UseAutocompleteOfflineProps<T>) => {
    const { options: optionsFromProps, filterOptions, delay, isAllowed, deps = [] } = props;

    const {
        query,
        setQuery,
        value,
        setValue,
        open,
        setOpen,
        debouncedQuery,
        debouncedValue,
        debouncedOpen,
        debouncedDeps,
    } = useAutocompleteState<T>(delay, deps);

    const { options } = useFilterAutocompleteOptions<T>({
        options: optionsFromProps,
        filterOptions,
        isAllowed,
        query: debouncedQuery,
        open: debouncedOpen,
        deps: debouncedDeps,
    });

    return {
        query,
        setQuery,
        options,
        error: null,
        value,
        setValue,
        open,
        setOpen,
        debouncedQuery,
        debouncedOpen,
        debouncedValue,
        debouncedDeps,
    };
};

/**
 * Fetches options from API, provides callback for disabling the fetch request, handles fetch aborting
 * @param {object} props 
 * @returns {object} {
        options,
        error
    }
    @example
    const { options, error } = useFetchAutocompleteOptions({
        query,
        open,
        getOptionsURL,
        isAllowed
    });
 */
export const useFetchAutocompleteOptions = <T,>(props: UseAutocompleteOnlineProps<T>) => {
    const {
        value,
        query = '',
        open = false,
        getOptionsURL,
        isAllowed: isAllowedFromProps = () => true,
        deps = [],
    } = props;

    const [options, setOptions] = useState<T[]>([]);
    const [error, setError] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(false);

    const isAllowed = useCallback(() => {
        const isAllowed = isAllowedFromProps?.({ query, open, options, error, value });
        return isAllowed && getOptionsURL;
    }, [query, open, options, error, getOptionsURL, ...deps]);

    const fetchCallback = useCallback(
        async ({ controller }: { controller: AbortController }) => {
            setLoading(true);
            if (!isAllowed()) {
                //if fetch is blocked current options are cleared and no new options are fetched
                if (options.length > 0) {
                    setOptions([]);
                }
                setLoading(false);
                return;
            }
            try {
                const url = `${getOptionsURL}?${new URLSearchParams({ search: query })}`;
                const response = await fetch(url, {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                    signal: controller.signal,
                });
                const json = await response.json();
                const data = json as T[];
                setOptions(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (controller.signal.aborted) {
                    return;
                }
                setError(error);
            }
        },
        [query, open, ...deps]
    );

    useAbortable(fetchCallback, [query, open, value, ...deps]);

    return {
        options,
        error,
        loading,
    };
};

/**
 * Filters options from the provided options array
 * @param {object} props 
 * @returns {object} {
        options
    }
    @example
    const { options } = useFilterAutocompleteOptions({
        options,
        query,
        open,
        filterOptions
    });
 */
export const useFilterAutocompleteOptions = <T,>(props: UseAutocompleteOfflineProps<T>) => {
    const {
        value,
        options = [],
        query = '',
        open = false,
        filterOptions: filterOptionsFromProps,
        isAllowed: isAllowedFromProps = () => true,
        deps = [],
    } = props;

    const isAllowed = useCallback(() => {
        const isAllowed = isAllowedFromProps?.({ query, open, options, value });
        return isAllowed && options?.length > 0;
    }, [query, open, options, options]);

    const filterOptions = useCallback(() => {
        if (!isAllowed()) {
            //if filtering is blocked options are cleared
            return [];
        }

        if (filterOptionsFromProps) {
            return filterOptionsFromProps(query, options);
        }

        if (query === '') {
            return options;
        }

        return (
            options?.filter((option) => {
                if (typeof option === 'string') {
                    //filtering the string options
                    return option.toLowerCase().includes(query.toLowerCase());
                } else if (
                    typeof option === 'object' &&
                    option !== null &&
                    'value' in option &&
                    typeof option.value === 'string'
                ) {
                    //filtering the object options by the possible value property
                    return option.value.toLowerCase().includes(query.toLowerCase());
                }
                return false;
            }) || []
        );
    }, [query, open, value, ...deps]);

    return { options: filterOptions() };
};
