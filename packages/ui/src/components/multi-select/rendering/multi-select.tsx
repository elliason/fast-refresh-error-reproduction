'use client';

//Source code from https://shadcn-extension-landing.vercel.app/docs/multi-select
import * as React from 'react';
import { Button } from '#components/button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '#components/command';
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover';
import { useComposedRefs } from '#lib/react';
import { cn } from '#lib/utils';
import * as CommandPrimitive from 'cmdk';
import { CheckIcon, ChevronDown, ChevronsUpDown, X as RemoveIcon } from 'lucide-react';
import { MultiSelectContextProvider, type TranslatedValues } from '../utils/multi-select-context.js';
import { useMultiSelect } from '../utils/use-multi-select.js';

type MultiSelectProps = {
    values?: readonly string[];
    onValuesChange?: (value: string[]) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    inputValue?: string;
    onInputValueChange?: (value: string) => void;
    loop?: boolean;
    name?: string;
    required?: boolean;
    translatedValues?: readonly TranslatedValues[];
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Command>, 'defaultValue' | 'defaultChecked'>;

/**
 * MultiSelect component
 * @description A mulit select that lets you select multiple items from a list
 * @param  values - The value array that contains the values of the selected items
 * @param  onValuesChange - The function that is called when the values change
 * @param  inputValue - The value of the input field
 * @param  onInputValueChange - The function that is called when the input value changes
 * @param  loop - If true, the selection will loop around when it reaches the end of current selected elements
 * @param  children - The children components that will be rendered inside the MultiSelect component
 * @param  dir - The direction of the MultiSelect component
 * @param  name - The name of the MultiSelect component
 * @param  autoComplete - The autoComplete value of the MultiSelect component
 * @param  disabled - If true, the MultiSelect component will be disabled
 * @param  required - If true, the MultiSelect component will be required
 * @param  selectProps - The props that will be passed to the select element
 * @param  selectRef - The ref that will be passed to the select element
 * @param  translatedValues - Object with key value pairs of the values and their translations. Use if you want to display the values in a different language.
 * @example
 * const [value, setValue] = React.useState<string[]>([]);

    return (
        <MultiSelect values={value} onValuesChange={setValue}>
            <MultiSelectTrigger>
                <MultiSelectInput placeholder="Select items" />
            </MultiSelectTrigger>
            <MultiSelectContent>
                <MultiSelectList>
                    {frameworks.map((framework, index) => (
                        <MultiSelectItem key={index} value={framework.value}>
                            {framework.label}
                        </MultiSelectItem>
                    ))}
                </MultiSelectList>
            </MultiSelectContent>
        </MultiSelect>
    );
 */
const MultiSelect = ({
    values: valueFromProps,
    onValuesChange: onValueChangeFromProps,
    open: openFromProps,
    onOpenChange: onOpenChangeFromProps,
    inputValue: inputValueFromProps,
    onInputValueChange,
    loop = true,
    className,
    translatedValues,
    children,
    dir,
    ...props
}: MultiSelectProps) => {
    const [value, setValue] = React.useState(valueFromProps || []);
    const [inputValue, setInputValue] = React.useState(inputValueFromProps || '');
    const [open, setOpen] = React.useState<boolean>(openFromProps ?? false);
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const triggerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (valueFromProps !== undefined) {
            setValue(valueFromProps);
        }
    }, [valueFromProps]);

    React.useEffect(() => {
        if (inputValueFromProps !== undefined) {
            setInputValue(inputValueFromProps);
        }
    }, [inputValueFromProps]);

    React.useEffect(() => {
        if (openFromProps !== undefined) {
            setOpen(openFromProps);
        }
    }, [openFromProps]);

    const onValueChange = React.useCallback(
        (val: string[]) => {
            if (onValueChangeFromProps === undefined || valueFromProps === undefined) {
                //if the state is not controlled from outside it is not updated inside
                setValue(val);
            }
            onValueChangeFromProps?.(val);
        },
        [onValueChangeFromProps, valueFromProps]
    );

    const onOpenChange = React.useCallback(
        (open: boolean) => {
            if (onOpenChangeFromProps === undefined || openFromProps === undefined) {
                //if the state is not controlled from outside it is not updated inside
                setOpen(open);
            }
            onOpenChangeFromProps?.(open);
        },
        [onOpenChangeFromProps, openFromProps]
    );

    const onInputValueChangeHandler = React.useCallback(
        (val: string) => {
            if (onInputValueChange === undefined || inputValueFromProps === undefined) {
                //if the state is not controlled from outside it is not updated inside
                setInputValue(val);
            }
            onInputValueChange?.(val);
        },
        [onInputValueChange]
    );

    const onValueChangeHandler = React.useCallback(
        (val: string) => {
            if (!onValueChange || !value) {
                return;
            }
            if (value.includes(val)) {
                onValueChange(value.filter((item) => item !== val));
            } else {
                onValueChange([...value, val]);
            }
        },
        [onValueChange, value]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (!value || !onValueChange) {
                return;
            }
            const moveNext = () => {
                e.preventDefault();
                e.stopPropagation();
                const nextIndex = activeIndex + 1;
                setActiveIndex(nextIndex > value.length - 1 ? -1 : nextIndex);
            };

            const movePrev = () => {
                e.preventDefault();
                e.stopPropagation();
                const prevIndex = activeIndex - 1;
                setActiveIndex(prevIndex < -1 ? value.length - 1 : prevIndex);
            };

            if (e.key === 'Backspace' || e.key === 'Delete') {
                if (inputValue.length > 0) {
                    return;
                }
                if (activeIndex !== -1 && activeIndex < value.length) {
                    onValueChange(value.filter((item) => item !== value[activeIndex]));
                    const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
                    setActiveIndex(newIndex);
                } else {
                    onValueChange(value.filter((item) => item !== value[value.length - 1]));
                }
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                onOpenChange(true);
                setActiveIndex(-1);
            } else if (e.key === 'Enter') {
                if (!open) {
                    onOpenChange(true);
                }
            } else if (e.key === 'Escape') {
                setActiveIndex(-1);
                onOpenChange(false);
                triggerRef.current?.focus();
            } else if (e.key === 'Tab') {
                setActiveIndex(-1);
            } else if (dir === 'rtl') {
                if (e.key === 'ArrowRight') {
                    movePrev();
                } else if (e.key === 'ArrowLeft' && (activeIndex !== -1 || loop)) {
                    moveNext();
                }
            } else {
                if (e.key === 'ArrowLeft') {
                    movePrev();
                } else if (e.key === 'ArrowRight' && (activeIndex !== -1 || loop)) {
                    moveNext();
                }
            }
        },
        [value, dir, activeIndex, loop, inputValue.length, onValueChange]
    );

    const ref = React.useRef<HTMLInputElement>(null);

    return (
        <div>
            <MultiSelectContextProvider
                value={value || []}
                onValueChange={onValueChangeHandler}
                open={open}
                setOpen={onOpenChange}
                inputValue={inputValue}
                setInputValue={onInputValueChangeHandler}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                triggerRef={triggerRef}
                translatedValues={translatedValues}
            >
                <Popover open={open}>
                    <Command
                        ref={ref}
                        onKeyDown={handleKeyDown}
                        className={cn('flex flex-col overflow-visible bg-transparent focus:outline-none', className)}
                        dir={dir}
                        data-testid="multiselect"
                        {...props}
                    >
                        {children}
                        {!open && <CommandList></CommandList>}
                    </Command>
                </Popover>
            </MultiSelectContextProvider>
        </div>
    );
};

/**
 * MultiSelectTrigger component
 * @description The trigger component for the MultiSelect. This is where the selected items are displayed.
 */
const MultiSelectTrigger = ({
    ref: forwardedRef,
    className,
    children,
    ...props
}: React.ComponentPropsWithRef<'div'>) => {
    const { open, triggerRef, value, onValueChange, activeIndex, translatedValues } = useMultiSelect();
    const ref = React.useRef<HTMLDivElement>(null);
    const combinedRef = useComposedRefs(ref, forwardedRef, triggerRef);

    const getTranslatedValue = (selectedValue: string) => {
        if (translatedValues) {
            return translatedValues.find((item) => item.value.toString() === selectedValue)?.label || selectedValue;
        }
        return selectedValue;
    };

    return (
        <PopoverTrigger asChild>
            <div
                ref={combinedRef}
                className={cn(
                    'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid=true]:border-destructive bg-input-background min-h-10 flex w-full items-center gap-1 rounded-md border p-1 pe-2 text-base shadow-inner file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                tabIndex={0}
                data-testid="multiselect-trigger"
                {...props}
            >
                <div className="flex basis-full flex-wrap items-center gap-1">
                    {value.map((item, index) => (
                        <div
                            key={item}
                            className={cn(
                                'border-input text-foreground bg-background inline-flex items-center gap-0.5 rounded-md border bg-white px-2 py-0.5 text-base leading-none',
                                className,
                                activeIndex === index && 'ring-muted-foreground ring-2 '
                            )}
                        >
                            <span className="text-base font-medium">{getTranslatedValue(item)}</span>
                            <Button
                                aria-label={`Remove ${item} option`}
                                aria-roledescription="button to remove option"
                                size="icon"
                                className="-mr-1 h-5 w-5 p-0"
                                onMouseDown={(e) => {
                                    //changed from onClick to onMouseDown - onClick was being triggerd even while focused out of the multi-select
                                    onValueChange(item);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                tabIndex={-1}
                            >
                                {/* TODO we need to have the possibility to translate this */}
                                <span className="sr-only">Remove {item} option</span>
                                <RemoveIcon className="hover:stroke-destructive h-5 w-5 stroke-gray-400" />
                            </Button>
                        </div>
                    ))}
                    <span className="flex h-7 w-48 flex-auto items-center ps-2 text-base focus-visible:ring-2 ">
                        {children}
                    </span>
                </div>
                <span className="flex h-7 flex-shrink-0 flex-grow-0  items-center">
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </span>
            </div>
        </PopoverTrigger>
    );
};

/**
 * MultiSelectInput component
 * @description The input component for the MultiSelect. This is where the user can type to filter the options.
 */
const MultiSelectInput = (
    props: React.ComponentPropsWithRef<typeof CommandPrimitive.CommandInput> & { searchPlaceholder?: string }
) => {
    const {
        ref: forwardedRef,
        className,
        placeholder: placeholderFromProps,
        searchPlaceholder: searchPlaceholderFromProps,
        ...etc
    } = props;

    const ref = React.useRef<HTMLInputElement>(null);
    const combinedRef = useComposedRefs(ref, forwardedRef);

    const { open, setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } = useMultiSelect();

    const searchPlaceholder = searchPlaceholderFromProps ?? 'Hledejte položky';
    const placeholder = open ? searchPlaceholder : (placeholderFromProps ?? '- vyberte položky -');

    React.useEffect(() => {
        if (open) {
            ref.current?.focus();
        } else {
            ref.current?.blur();
        }
    }, [open]);

    return (
        <CommandPrimitive.CommandInput
            {...etc}
            tabIndex={-1} //setting tabIndex to -1 when open for correct shift+tab behavior
            ref={combinedRef}
            value={inputValue}
            placeholder={placeholder}
            onValueChange={activeIndex === -1 ? setInputValue : undefined}
            onBlur={() => setOpen(false)}
            onFocus={() => {
                setOpen(true);
                ref.current?.setSelectionRange(inputValue.length - 1, inputValue.length - 1);
            }}
            onClick={() => setActiveIndex(-1)}
            data-testid="multiselect-select-input"
            className={cn(
                'placeholder:text-muted-foreground flex w-full bg-transparent outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className,
                activeIndex !== -1 && 'caret-transparent'
            )}
        />
    );
};

/**
 * MultiSelectContent component
 * @description The content component for the MultiSelect. This is where the options are displayed.
 */
const MultiSelectContent = ({
    ref,
    children,
    className,
    ...restProps
}: React.ComponentPropsWithRef<typeof PopoverContent>) => {
    const { open } = useMultiSelect();
    if (!open) {
        return null;
    }
    return (
        <PopoverContent
            align="start"
            className={cn(`w-[var(--radix-popover-trigger-width)] p-0`, className)}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            {...restProps}
        >
            {children}
        </PopoverContent>
    );
};

/**
 * MultiSelectList component
 * @description The list component for the MultiSelect.
 */
const MultiSelectList = ({ ref, children, ...rest }: React.ComponentPropsWithRef<typeof CommandList>) => {
    return (
        <CommandList ref={ref} data-testid="multi-select-list" {...rest} onMouseDown={(e) => e.preventDefault()}>
            {children}
            <CommandEmpty>
                <span className="text-muted-foreground">No results found</span>
            </CommandEmpty>
        </CommandList>
    );
};

/**
 * MultiSelectItem component
 * @description The item component for the MultiSelect.
 */
const MultiSelectItem = ({
    ref,
    className,
    value,
    children,
    ...props
}: React.ComponentPropsWithRef<typeof CommandItem> & { value: string; children: React.ReactNode }) => {
    const { value: Options, onValueChange, setInputValue } = useMultiSelect();

    const mousePreventDefault = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const isIncluded = Options.includes(value);

    return (
        <CommandItem
            ref={ref}
            value={value}
            {...props}
            onSelect={() => {
                onValueChange(value);
                setInputValue('');
            }}
            data-testid="multi-select-item"
            onMouseDown={mousePreventDefault}
        >
            <CheckIcon className={cn('mr-2 h-4 w-4', isIncluded ? 'opacity-100' : 'opacity-0')} />
            {children}
        </CommandItem>
    );
};

const MultiselectGroup = CommandGroup;

export {
    MultiSelect,
    MultiSelectTrigger,
    MultiselectGroup,
    MultiSelectInput,
    MultiSelectContent,
    MultiSelectList,
    MultiSelectItem,
};
