'use client';

import {
    createContext,
    useCallback,
    useContext,
    useId,
    useState,
    type ComponentProps,
    type FC,
    type PropsWithChildren,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '#lib/utils';
import { Checkbox } from '#components/checkbox';
import { Label } from '#components/label';

const checkboxGroupItemVariants = cva(
    [
        'inline-flex items-center rounded-md font-normal text-left ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-active ring-inset border border-input bg-input-background hover:bg-active-hover/5 hover:border-active-hover hover:text-active-hover h-10 px-4',
        'cursor-pointer relative',
    ],
    {
        variants: {
            rounded: {
                true: 'rounded-full',
                false: '',
            },
            size: {
                default: 'h-10 pl-2 pr-4 gap-2 text-base',
                sm: 'h-8 pl-1.5 pr-2.5 gap-1.5 text-xs font-medium',
                lg: 'h-11 pl-2.5 pr-5 gap-2.5 text-base',
                auto: 'pl-2.5 pr-5 py-5 gap-2 data-[state=on]:text-foreground text-base',
            },
            variant: {
                default: '',
                chip: '',
            },
            disabled: {
                true: 'pointer-events-none opacity-50',
                false: '',
            },
            checked: {
                true: 'ring-2 border-active bg-active/5 text-active',
                false: '',
            },
        },
        defaultVariants: {
            rounded: false,
            size: 'default',
            variant: 'default',
        },
    }
);

const checkboxVariants = cva('', {
    variants: {
        rounded: {
            true: 'rounded-full',
            false: '',
        },
        size: {
            default: '',
            sm: 'h-5 w-5',
            lg: '',
            auto: '',
        },
    },
    defaultVariants: {
        rounded: false,
        size: 'default',
    },
});

interface CheckboxGroupContextValue extends VariantProps<typeof checkboxGroupItemVariants> {
    onValueAdd(value: string): void;
    onValueRemove(value: string): void;
    value: string[];
}

function defaultContextValue() {
    throw new Error('Unexpected use of CheckboxGroupItem, please use CheckboxGroupItem inside CheckboxGroup');
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({
    onValueAdd: defaultContextValue,
    onValueRemove: defaultContextValue,
    rounded: false,
    size: 'default',
    value: [],
    variant: 'default',
});

type DivPropType = ComponentProps<'div'>;

interface CheckboxGroupProps extends PropsWithChildren, VariantProps<typeof checkboxGroupItemVariants> {
    className?: DivPropType['className'];
    'data-testid'?: string;
    onBlur?: DivPropType['onBlur'];
    onValueChange?: (value: string[]) => void;
    value?: string[];
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
    children,
    className,
    'data-testid': dataTestId = 'checkbox-group',
    onValueChange,
    rounded,
    size,
    value,
    variant,
    ...props
}) => {
    const [state, setState] = useState<string[]>(value ?? []);
    const onValueAdd = useCallback(
        (checkboxName: string) => {
            setState((prev) => {
                const updatedState = [...prev, checkboxName];
                onValueChange?.(updatedState);

                return updatedState;
            });
        },
        [onValueChange]
    );
    const onValueRemove = useCallback(
        (checkboxName: string) => {
            setState((prev) => {
                const updatedState = prev.filter((v) => v !== checkboxName);
                onValueChange?.(updatedState);

                return updatedState;
            });
        },
        [onValueChange]
    );

    return (
        <CheckboxGroupContext.Provider value={{ rounded, size, variant, value: state, onValueAdd, onValueRemove }}>
            <div
                {...props}
                className={cn('flex flex-wrap gap-2', { 'flex-col': variant === 'default' }, className)}
                data-testid={dataTestId}
            >
                {children}
            </div>
        </CheckboxGroupContext.Provider>
    );
};

interface CheckboxGroupItemProps extends PropsWithChildren, VariantProps<typeof checkboxGroupItemVariants> {
    className?: DivPropType['className'];
    'data-testid'?: string;
    // eslint-disable-next-line react/boolean-prop-naming
    disabled?: boolean;
    value: string;
}

export const CheckboxGroupItem: FC<CheckboxGroupItemProps> = ({
    children,
    'data-testid': dataTestId = 'checkbox-group-item',
    disabled = false,
    className,
    rounded,
    size,
    variant,
    value,
}) => {
    const id = `${useId()}-checkbox-group-item`;
    const { onValueAdd, onValueRemove, ...context } = useContext(CheckboxGroupContext);
    const checked = context.value.includes(value);

    const onCheckedChange = useCallback(
        (checked: boolean) => {
            const method = checked ? onValueAdd : onValueRemove;

            method(value);
        },
        [onValueAdd, onValueRemove, value]
    );

    return (
        <div
            className={cn(
                checkboxGroupItemVariants({
                    checked,
                    disabled,
                    rounded: context.rounded || rounded,
                    size: context.size || size,
                    variant: context.variant || variant,
                }),
                className
            )}
            data-testid={dataTestId}
        >
            <Checkbox
                id={id}
                className={checkboxVariants({ rounded: context.rounded || rounded, size: context.size || size })}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
            />
            <Label htmlFor={id} className="mb-0 !text-inherit cursor-pointer after:absolute after:inset-0">
                {children}
            </Label>
        </div>
    );
};
