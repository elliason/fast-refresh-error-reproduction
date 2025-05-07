import { createContext } from '#lib/react';

export interface FieldSetContextProps {
    data: Record<string, unknown>;
    setData: (data: Record<string, unknown>) => void;
}

const [FieldSetContextProvider, useFieldSetContext] = createContext<FieldSetContextProps>(
    'FieldSet',
    {} as FieldSetContextProps
);

export { useFieldSetContext, FieldSetContextProvider };
