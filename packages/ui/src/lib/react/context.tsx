'use client';

import * as React from 'react';

// TODO: investigate and maybe add support for scoped context in the same way radix-ui does it.
/**
 * Helper function to create a context with a provider and a hook for consuming the context.
 * Takes a root component name and an optional default context value.
 * inspired by radix-ui ( https://github.com/radix-ui/primitives/blob/main/packages/react/context/src/createContext.tsx )
 * @param rootComponentName
 * @param defaultContext
 * @returns
 */
export function createContext<ContextValueType extends object | null>(
    rootComponentName: string,
    defaultContext?: ContextValueType
) {
    const Context = React.createContext<ContextValueType | undefined>(defaultContext);

    function Provider(props: ContextValueType & { children: React.ReactNode }) {
        const { children, ...context } = props;
        // Only re-memoize when prop values change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const value = React.useMemo(() => context, Object.values(context)) as ContextValueType;
        return <Context.Provider value={value}>{children}</Context.Provider>;
    }

    function useContext(consumerName: string) {
        const context = React.useContext(Context);
        if (context) {
            return context;
        }
        if (defaultContext !== undefined) {
            return defaultContext;
        }
        // if a defaultContext wasn't specified, it's a required context.
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }

    Provider.displayName = rootComponentName + 'Provider';
    return [Provider, useContext] as const;
}
