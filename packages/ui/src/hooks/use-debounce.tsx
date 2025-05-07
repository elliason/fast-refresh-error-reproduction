'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Calls a callback after a delay
 * @param callback
 * @param delay
 * @param deps
 */
export const useDebounce = (callback: () => void, delay = 200, deps?: React.DependencyList) => {
    useEffect(() => {
        const debounce = setTimeout(() => callback(), delay);
        return () => {
            clearTimeout(debounce);
        };
    }, deps);
};

/**
 * Returns a debounced value
 * @param value
 * @param delay
 * @returns
 */
export const useDebouncedValue = <T,>(value: T, delay = 200): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useDebounce(() => setDebouncedValue(value), delay, Array.isArray(value) ? [...value] : [value]);
    return debouncedValue;
};

/**
 * Calls a callback after a delay with the ability to abort a fetch
 * @param callback
 * @param delay
 * @param deps
 */
export const useDebounceWithAbort = (
    callback: ({ controller }: { controller: AbortController }) => Promise<void>,
    delay = 200,
    deps?: React.DependencyList
) => {
    const memoizedCallback = useCallback(callback, deps ? [...deps] : []);
    useEffect(() => {
        const controller = new AbortController();
        const debounce = setTimeout(() => memoizedCallback({ controller }), delay);
        return () => {
            clearTimeout(debounce);
            controller.abort();
        };
    }, [memoizedCallback, delay]);
};

/**
 * Calls a callback with an AbortController
 * @param callback
 * @param deps
 */
export const useAbortable = (
    callback: ({ controller }: { controller: AbortController }) => void | Promise<void>,
    deps?: React.DependencyList
) => {
    useEffect(() => {
        const controller = new AbortController();
        callback({ controller });
        return () => {
            controller.abort();
        };
    }, deps);
};

/**
 * Fetches data with an AbortController
 * @param url
 * @param init
 * @param delay
 * @param deps
 */
export const useAbortableFetch = <T,>({
    url,
    init,
    deps,
}: {
    url: string | URL | Request;
    init?: RequestInit;
    deps?: React.DependencyList;
}): {
    data: T | null;
    error: unknown | null;
    controller: AbortController | null;
} => {
    const controllerRef = useRef<AbortController>(null);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown | null>(null);

    const fetchCallback = useCallback(
        async ({ controller }: { controller: AbortController }) => {
            controllerRef.current = controller;
            try {
                console.log('fetching data');
                const response = await fetch(url, {
                    signal: controller.signal,
                    ...init,
                });
                const json = await response.json();
                const data = json as T;
                setData(data);
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                setError(error);
            }
        },
        [url, init]
    );

    useAbortable(fetchCallback, deps);

    return { data, error, controller: controllerRef.current };
};

/**
 * Fetches data with a debounced fetch
 * @param url
 * @param init
 * @param delay
 * @param deps
 */
export const useDebouncedFetch = <T,>(
    url: string | URL | Request,
    init?: RequestInit,
    delay = 200,
    deps?: React.DependencyList
): {
    data: T | null;
    error: unknown | null;
    controller: AbortController | null;
} => {
    const debouncedDeps = useDebouncedValue(deps, delay);
    const { data, error, controller } = useAbortableFetch<T>({ url, init, deps: debouncedDeps });
    return { data, error, controller };
};
