/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { startTransition } from 'react';
import { composeEventHandlers, useComposedRefs } from '#lib/react';
import {
    FormProvider,
    type Control,
    type DefaultValues,
    type FieldValues,
    type SubmitHandler,
    type UseFormReturn,
} from 'react-hook-form';
import { DescriptionIdsProvider } from './message-description-ids/description-ids-context.js';
import { useMessageDescriptionId } from './message-description-ids/use-message-description-id.js';
import { getFirstInvalidControl } from './utils/getFirstInvalidControl.js';

interface DevtoolUIProps {
    control: Control<any>;
    placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Custom styles for the "show/hide panel" button and for the panel div */
    styles?: {
        /** Custom styles for the "show/hide panel" button */
        button?: React.HTMLAttributes<HTMLButtonElement>['style'];
        /** Custom styles for the panel div */
        panel?: React.HTMLAttributes<HTMLDivElement>['style'];
    };
}

export type FormBasicProps<Inputs extends FieldValues = FieldValues> = React.PropsWithChildren<{
    defaultValues?: DefaultValues<Inputs>;
    onClearServerErrors?(): void;
    action?: ((payload: Inputs) => void) | string;
    onSubmit?: SubmitHandler<Inputs>;
    form: UseFormReturn<Inputs, any, undefined>; // use for external control of form, return of useForm from react-hook-form
    DevTool?: React.ComponentType<
        | ({
              id?: string | undefined;
              control?: Control<Inputs, any> | undefined;
          } & Pick<DevtoolUIProps, 'placement' | 'styles'>)
        | undefined
    >;
    serverState?: Record<string, unknown>;
    onInvalid?: (event: React.FormEvent<HTMLFormElement>) => void;
    onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}> & {
    ref?: React.Ref<HTMLFormElement>;
};

export const FormBasic = <Inputs extends FieldValues>({
    ref: forwardedRef,
    DevTool,
    form,
    method,
    ...props
}: FormBasicProps<Inputs>) => {
    const { children, onSubmit, onClearServerErrors = () => {}, defaultValues, action, ...htmlAttributes } = props;
    const formRef = React.useRef<HTMLFormElement>(null);
    const composedFormRef = useComposedRefs(forwardedRef, formRef);

    // keeps track of displayed validation messages for each field and updates inputs aria-describedby attributes
    const { handleFieldMessageIdAdd, handleFieldMessageIdRemove, getFieldDescription } = useMessageDescriptionId();

    const onSubmitHandler: SubmitHandler<Inputs> = (data, event) => {
        onClearServerErrors();

        if (onSubmit) {
            event?.preventDefault();
            onSubmit(data, event);
            return;
        }

        if (action && typeof action === 'function') {
            startTransition(() => {
                action(data);
            });
            event?.preventDefault();
            return;
        }

        if (action && typeof action === 'string') {
            formRef.current?.submit();
        }
    };

    return (
        <DescriptionIdsProvider
            onFieldMessageIdAdd={handleFieldMessageIdAdd}
            onFieldMessageIdRemove={handleFieldMessageIdRemove}
            getFieldDescription={getFieldDescription}
        >
            <form
                noValidate
                ref={composedFormRef}
                method={method}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target instanceof HTMLInputElement && e.target.type !== 'submit') {
                        e.preventDefault();
                    }
                }}
                onInvalid={composeEventHandlers(props.onInvalid, (event) => {
                    const firstInvalidControl = getFirstInvalidControl(event.currentTarget);
                    if (firstInvalidControl === event.target) {
                        firstInvalidControl?.focus();
                    }

                    // prevent default browser UI for form validation
                    event.preventDefault();
                })}
                action={typeof action === 'string' ? action : undefined}
                onSubmit={form.handleSubmit(onSubmitHandler)}
                // clear server errors when the form is reset
                onReset={composeEventHandlers(props.onReset, onClearServerErrors)}
                {...htmlAttributes}
            >
                <FormProvider {...form}>{children}</FormProvider>
                {DevTool && <DevTool control={form.control} />}
            </form>
        </DescriptionIdsProvider>
    );
};
