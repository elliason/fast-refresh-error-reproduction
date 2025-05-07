'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type FormContainerContextType = {
    isError: boolean;
    setIsError: (isError: boolean) => void;
};

const FormContainerContext = createContext<FormContainerContextType | undefined>(undefined);

export const useFormContainerContext = () => {
    const context = useContext(FormContainerContext);

    return context || undefined;
};

type FormContainerFieldProps = {
    children: ReactNode;
};

export const FormContainerProvider = ({ children }: FormContainerFieldProps) => {
    const [isError, setIsError] = useState(false);

    return <FormContainerContext.Provider value={{ isError, setIsError }}>{children}</FormContainerContext.Provider>;
};
