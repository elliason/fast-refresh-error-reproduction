'use client';

import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';
import { FieldContextProvider } from './field-context.js';
import { useFormContainerContext } from './form-container-context.js';
import { useFieldValidity } from './use-field-validity.js';

export type FieldProps = {
    name: string;
    serverInvalid?: boolean;
    'data-testid'?: string;
    asChild?: boolean;
} & PropsWithChildren;
/**
 * Field component for managing form field validity state and providing context to its children.
 * This component wraps form fields, providing a context that allows them to access the current field's validity and other states.
 *
 * @component
 *
 * @param {string} props.name - The name of the field. This is used to track the field's validity and dirtiness.
 * @param {boolean} [props.serverInvalid] - Flag to mark the field as invalid due to server-side validation. Defaults to `false`.
 * @param {string} [props.data-testid] - Optional identifier for testing purposes. Defaults to 'field'.
 * @param {React.ReactNode} props.children - The child components of the Field. These will receive the field's context.
 * @param {boolean} [props.asChild] - Setting asChild will not render a default DOM element, instead cloning the components's child and passing it the props and behavior required to make it functional.
 *
 * @returns {React.ReactElement} The Field component that provides validation context to its children.
 *
 * @example
 * // Usage example with a custom form field inside the Field component.
 * function MyForm() {
 *   return (
 *     <Field name="email" serverInvalid={false}>
 *       <input type="email" name="email" />
 *     </Field>
 *   );
 * }
 */

export const Field = ({
    'data-testid': dataTestId = 'field',
    children,
    name,
    asChild,
    serverInvalid = false,
}: FieldProps) => {
    const id = React.useId();
    const Com = asChild ? Slot.Root : 'div';
    const { isValid, isDirty } = useFieldValidity({ name, serverInvalid });
    return (
        <Com data-valid={isValid} data-invalid={!isValid} data-testid={dataTestId}>
            <FieldContextProvider
                name={name}
                id={id}
                isValid={isValid}
                isDirty={isDirty}
                isServerInvalid={serverInvalid}
            >
                {children}
            </FieldContextProvider>
        </Com>
    );
};
