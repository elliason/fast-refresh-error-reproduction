import { type ReactNode } from 'react';
import { FormContainerProvider, useFormContainerContext } from './form-container-context.js';

type FormContainerFieldProps = {
    children({ isError }: { isError: boolean }): ReactNode;
};

export const FormContainerField = ({ children }: FormContainerFieldProps) => {
    return (
        <FormContainerProvider>
            <FormContainerConsumer>{({ isError }) => children({ isError })}</FormContainerConsumer>
        </FormContainerProvider>
    );
};
const FormContainerConsumer = ({ children }: { children: (context: { isError: boolean }) => ReactNode }) => {
    const context = useFormContainerContext();

    return <>{children({ isError: context?.isError || false })}</>;
};
