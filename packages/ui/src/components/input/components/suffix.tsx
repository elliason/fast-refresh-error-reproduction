import type { PropsWithChildren } from 'react';

/**
 * Suffix component that renders a styled suffix for an input field.
 *
 * @component
 *
 * @param {Object} props - The properties of the Suffix component.
 * @param {React.ReactNode} props.children - The content to display inside the suffix, typically text or an icon.
 *
 * @returns {React.ReactElement} - A styled span element to serve as the suffix for an input field.
 *
 * @example
 * // Example usage of the Suffix component
 * function MyInputComponent() {
 *   return (
 *     <div>
 *       <Input />
 *       <Suffix>.com</Suffix>
 *     </div>
 *   );
 * }
 */
export const Suffix = ({ children }: PropsWithChildren) => {
    return (
        <span className="border-input text-foreground/80 group-has-[input:disabled]:opacity-50 flex h-10 items-center whitespace-nowrap rounded-r-md border border-s-0 bg-gray-100 px-3 py-2 text-base leading-none">
            {children}
        </span>
    );
};
