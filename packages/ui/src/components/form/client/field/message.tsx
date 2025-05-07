'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';
import { type LiteralUnion, type RegisterOptions } from 'react-hook-form';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { useField } from './field-context.js';
import { useFieldValidity } from './use-field-validity.js';

export type MatchOptions = Pick<
    RegisterOptions,
    'required' | 'pattern' | 'minLength' | 'maxLength' | 'min' | 'max' | 'validate'
>;
export type MatchOptionsKeys = keyof MatchOptions;
export type CustomMatcher = MatchOptions['validate'];

export type FieldMessageProps<CustomMatchers extends Array<string>> = Omit<MessageBaseProps, 'name'> & {
    /**
     * The type of validation error to match.
     * The generic type CustomMatchers is used if you want to perform ts validation on the match prop.
     * To use this pass an array of strings, where each string is the name of a custom matcher.
     * @example
     * <Message<['customValidateName']> match="customValidateName">
     *     {message}
     * </Message>
     */
    match?: LiteralUnion<MatchOptionsKeys, CustomMatchers[number]>;
    /**
     * Forces the message to be shown. This is useful when using server-side validation.
     */
    forceMatch?: boolean;
    /**
     * Used to target a specific field by name when rendering outside a Field part.
     */
    name?: string;
    'data-testid'?: string;
    asChild?: boolean;
};

const DEFAULT_INVALID_MESSAGE = 'This value is not valid';
const DEFAULT_BUILT_IN_MESSAGES = {
    pattern: 'This value does not match the required pattern',
    max: 'This value is too large',
    min: 'This value is too small',
    maxLength: 'This value is too long',
    minLength: 'This value is too short',
    required: 'This value is missing',
    validate: 'This value is invalid',
} as const satisfies Record<MatchOptionsKeys, string>;

const getDefaultMessage = (match: keyof MatchOptions) => {
    return DEFAULT_BUILT_IN_MESSAGES[match];
};
const isBuiltInMatcher = (match: string | undefined): match is MatchOptionsKeys => {
    if (match === undefined) {
        return false;
    }
    return match in DEFAULT_BUILT_IN_MESSAGES;
};

/**
 * Form Message shows error message for a specific field.
 * Place validation rules on the Input component and use the match prop to match the validation error.
 * For custom validation use the "validate" prop on the Input component.
 * For server-side or other controlled validation, use the forceMatch prop to force the message to be shown.
 * @link https://react-hook-form.com/get-started#Applyvalidation
 * @example
 * <Field name="name.familyName" serverInvalid={fields?.name.familyName.invalid}>
 *     <Label>familyName:</Label>
 *     <Input type="text" required minLength={3} validate={{startWithJ: (value) => value.startsWith('J')}} />
 *     <Message match="required">Please enter your name</Message>
 *     <Message match="minLength">Name must be at least 3 characters long</Message>
 *     <Message match="startWithJ">Jméno musí začínat na J (custom validator)</Message>
 * </Field> *
 */
export const FieldMessage = <CustomMatchers extends Array<string>>({
    ref: forwardedRef,
    asChild,
    ...props
}: FieldMessageProps<CustomMatchers>) => {
    const { match, name: nameProp, 'data-testid': dataTestId = 'field-message', forceMatch, ...messageProps } = props;
    const fieldContext = useField();
    const name = nameProp ?? fieldContext.name;
    const Comp = asChild ? Slot.Root : MessageBase;
    const { fieldError } = useFieldValidity({ name, serverInvalid: !!forceMatch });

    const showMessage = (() => {
        if (forceMatch) {
            return true;
        }
        if (fieldError && 'type' in fieldError && fieldError.type === match) {
            return true;
        }
        if (fieldError && 'type' in fieldError && fieldError.type === 'validate' && fieldError?.message === match) {
            return true;
        }
        if (fieldContext.isServerInvalid && match === 'serverInvalid' && !fieldError) {
            return true;
        }

        return false;
    })();

    if (showMessage) {
        return <Comp {...messageProps} ref={forwardedRef} name={name} data-testid={dataTestId}></Comp>;
    }

    return null;
};

type PrimitiveSpanProps = Pick<React.ComponentPropsWithRef<'span'>, 'id' | 'ref' | 'className' | 'children'>;
interface MessageBaseProps extends PrimitiveSpanProps {
    name: string;
}

const MessageBase = ({ ref: forwardedRef, ...props }: MessageBaseProps) => {
    const { id: idProp, name, className, ...messageProps } = props;
    const { onFieldMessageIdAdd, onFieldMessageIdRemove } = useDescriptionIdsContext('MessageBase');
    const _id = React.useId();
    const id = idProp ?? _id;

    React.useEffect(() => {
        onFieldMessageIdAdd(name, id);
        return () => onFieldMessageIdRemove(name, id);
    }, [name, id, onFieldMessageIdAdd, onFieldMessageIdRemove]);

    return (
        <div>
            <span
                id={id}
                role="alert"
                className={cn(
                    'bg-destructive/5 text-destructive leading-1 font-base mt-1 inline-flex rounded-sm py-1 pl-1.5 pr-2.5 text-xs before:mr-1 before:content-["↑"]',
                    className
                )}
                {...messageProps}
                ref={forwardedRef}
            />
        </div>
    );
};
