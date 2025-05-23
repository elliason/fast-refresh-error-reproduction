/**
 * Based on https://github.com/gregberge/twc
 * Adjusted to support tailwind classnames merging by default, using cn instead of clsx as the default compose function
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type { JSX } from 'react';
import { Slot } from 'radix-ui';
// I changed the original CLSX to CN because of tailwind def merging, this can be changed back to clsx via config
// import { clsx } from 'clsx';
import { cn } from './cn.js';

type AbstractCompose = (...params: any) => any;

type ResultProps<
    TComponent extends React.ElementType,
    TProps,
    TExtraProps,
    TCompose extends AbstractCompose,
> = TProps extends undefined
    ? TExtraProps extends undefined
        ? Omit<React.ComponentProps<TComponent>, 'className'> & {
              className?: Parameters<TCompose>[0];
          }
        : Omit<React.ComponentProps<TComponent>, 'className'> & {
              className?: Parameters<TCompose>[0];
          } & TExtraProps
    : TProps;

type Template<
    TComponent extends React.ElementType,
    TCompose extends AbstractCompose,
    TExtraProps,
    TParentProps = undefined,
> = <TProps = TParentProps>(
    strings:
        | TemplateStringsArray
        | ((
              props: ResultProps<TComponent, TProps, TExtraProps, TCompose>
          ) => 'className' extends keyof TProps ? TProps['className'] : Parameters<TCompose>[0]),
    ...values: any[]
) => React.ForwardRefExoticComponent<ResultProps<TComponent, TProps, TExtraProps, TCompose>>;

type ElementTagName = Exclude<keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap, 'set'>;

type FirstLevelTemplate<TComponent extends React.ElementType, TCompose extends AbstractCompose, TExtraProps> = Template<
    TComponent,
    TCompose,
    TExtraProps
> & {
    /**
     * Add additional props to the component.
     */
    attrs: <TProps = undefined>(
        attrs:
            | (Omit<Partial<React.ComponentProps<TComponent>>, 'className'> & Record<string, any>)
            | ((props: ResultProps<TComponent, TProps, TExtraProps, TCompose>) => Record<string, any>)
    ) => Template<TComponent, TCompose, TExtraProps, TProps>;
} & {
    /**
     * Prevent props from being forwarded to the component.
     */
    transientProps: (
        fn: string[] | ((prop: string) => boolean)
    ) => FirstLevelTemplate<TComponent, TCompose, TExtraProps>;
};

type Twc<TCompose extends AbstractCompose> = (<T extends React.ElementType>(
    component: T
) => FirstLevelTemplate<T, TCompose, undefined>) & {
    [Key in ElementTagName]: FirstLevelTemplate<Key, TCompose, { asChild?: boolean }>;
};

export type TwcComponentProps<
    TComponent extends React.ElementType,
    TCompose extends AbstractCompose = typeof cn,
> = ResultProps<TComponent, undefined, { asChild?: boolean }, TCompose>;

export type Config<TCompose extends AbstractCompose> = {
    /**
     * The compose function to use. Defaults to `cn`.
     */
    compose?: TCompose;
    /**
     * The function to use to determine if a prop should be forwarded to the
     * underlying component. Defaults to `prop => prop[0] !== "$"`.
     */
    shouldForwardProp?: (prop: string) => boolean;
};

function filterProps(props: Record<string, any>, shouldForwardProp: (prop: string) => boolean) {
    const filteredProps: Record<string, any> = {};
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        const prop = keys[i] as string;
        if (shouldForwardProp(prop)) {
            filteredProps[prop] = props[prop];
        }
    }
    return filteredProps;
}

type Attributes = Record<string, any> | ((props: any) => Record<string, any>);

export const createTwc = <TCompose extends AbstractCompose = typeof cn>(config: Config<TCompose> = {}) => {
    const compose = config.compose || cn;
    const defaultShouldForwardProp = config.shouldForwardProp || ((prop) => prop[0] !== '$');
    const wrap = (Component: React.ElementType) => {
        const createTemplate = (attrs?: Attributes, shouldForwardProp = defaultShouldForwardProp) => {
            const template = (stringsOrFn: TemplateStringsArray | ((props: any) => string), ...values: any[]) => {
                const isClassFn = typeof stringsOrFn === 'function';
                const tplClassName = !isClassFn && String.raw({ raw: stringsOrFn }, ...values);
                // eslint-disable-next-line react/display-name
                return ({
                    ref,
                    ...p
                }: React.ComponentPropsWithRef<typeof Component> & { ref: React.RefObject<any> }) => {
                    const { className: classNameProp, asChild, ...rest } = p;
                    const rp = typeof attrs === 'function' ? attrs(p) : attrs ? attrs : {};
                    const fp = filterProps({ ...rp, ...rest }, shouldForwardProp);
                    const Comp = asChild ? Slot.Root : Component;
                    const resClassName = isClassFn ? stringsOrFn(p) : tplClassName;
                    return (
                        <Comp
                            ref={ref}
                            className={
                                typeof resClassName === 'function'
                                    ? (renderProps: any) =>
                                          compose(
                                              // @ts-expect-error eee
                                              resClassName(renderProps),
                                              typeof classNameProp === 'function'
                                                  ? classNameProp(renderProps)
                                                  : classNameProp
                                          )
                                    : compose(resClassName, classNameProp)
                            }
                            {...fp}
                        />
                    );
                };
            };

            template.transientProps = (fnOrArray: string[] | ((prop: string) => boolean)) => {
                const shouldForwardProp =
                    typeof fnOrArray === 'function'
                        ? (prop: string) => !fnOrArray(prop)
                        : (prop: string) => !fnOrArray.includes(prop);
                return createTemplate(attrs, shouldForwardProp);
            };

            if (attrs === undefined) {
                template.attrs = (attrs: Attributes) => {
                    return createTemplate(attrs);
                };
            }

            return template;
        };

        return createTemplate();
    };

    return new Proxy(
        (component: React.ComponentType) => {
            return wrap(component);
        },
        {
            get(_, name) {
                return wrap(name as keyof JSX.IntrinsicElements);
            },
        }
    ) as any as Twc<TCompose>;
};

export const twc = createTwc();
