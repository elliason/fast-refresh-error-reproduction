'use client';

import { useRef, useState, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from 'react';

type InputWrapperProps = {
    children({
        value,
        setValue,
        ref,
    }: {
        value: React.InputHTMLAttributes<HTMLInputElement>['value'];
        setValue: Dispatch<SetStateAction<React.InputHTMLAttributes<HTMLInputElement>['value']>>;
        ref: RefObject<HTMLInputElement | null>;
    }): ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'>;

/**
 * InputWrapper component that provides a wrapper around an input field, including value state management and event handling.
 *
 * @component
 *
 * @param {Object} props - The properties of the InputWrapper component.
 * @param {function} props.children - A function returning a ReactNode, which receives the following parameters:
 *   @param {Object} childrenProps - The parameters passed to the children function.
 *   @param {InputProps['value']} childrenProps.value - The current value of the input.
 *   @param {Dispatch<SetStateAction<InputProps['value']>>} childrenProps.setValue - A function to update the input value.
 *   @param {RefObject<HTMLInputElement | null>} childrenProps.ref - A reference to the HTML input element.
 *   @param {InputProps['onChange']} childrenProps.onChange - A function called when the input value changes.
 *   @param {InputProps['onInput']} childrenProps.onInput - A function called on the input event.
 *   @param {InputProps['onBlur']} childrenProps.onBlur - A function called when the input loses focus.
 * @param {InputProps} props - Additional properties inherited from InputProps, excluding 'children'.
 *
 * @returns {React.ReactElement} - A rendered element wrapping the input field.
 *
 * @example
 * // Example usage of the InputWrapper component
 * function MyInputComponent() {
 *   return (
 *     <InputWrapper value="" onChange={(e) => console.log(e.target.value)}>
 *       {({ onChange, value, ref }) => (
 *         <Input ref={ref} value={value} onChange={onChange} />
 *       )}
 *     </InputWrapper>
 *   );
 * }
 */

export const InputWrapper = ({ children, ...props }: InputWrapperProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(props.value);

    return children({
        value: value,
        setValue,
        ref,
    });
};
