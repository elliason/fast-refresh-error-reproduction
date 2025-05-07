import { createContext } from '#lib/react';

export type TranslatedValues = Readonly<{
    value: string;
    label: string;
}>;

export interface MultiSelectContextProps {
    value: readonly string[];
    onValueChange: (value: string) => void;
    open: boolean;
    setOpen: (value: boolean) => void;
    inputValue: string;
    setInputValue: (val: string) => void; //React.Dispatch<React.SetStateAction<string>>;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    translatedValues?: readonly TranslatedValues[];
    required?: boolean;
    name?: string;
    selectProps?: React.ComponentPropsWithoutRef<'select'>;
    selectRef?: React.Ref<HTMLDivElement>;
    triggerRef?: React.Ref<HTMLDivElement>;
}

const [MultiSelectContextProvider, useMultiSelectContext] = createContext<MultiSelectContextProps>(
    'MultiSelect',
    {} as MultiSelectContextProps
);

export { useMultiSelectContext, MultiSelectContextProvider };
