import type { PropsWithChildren } from 'react';

/**
 * Prefix component that renders a styled prefix for an input field.
 *
 * @component
 *
 * @param {Object} props - The properties of the Prefix component.
 * @param {React.ReactNode} props.children - The content to display inside the prefix, typically text or an icon.
 *
 * @returns {React.ReactElement} - A styled span element to serve as the prefix for an input field.
 *
 * @example
 * // Example usage of the Prefix component
 * function MyInputComponent() {
 *   return (
 *     <div>
 *       <Prefix>$</Prefix>
 *       <Input />
 *     </div>
 *   );
 * }
 */
export const Prefix = ({ children }: PropsWithChildren) => {
    return (
        <span className="border-input text-foreground/80 group-has-[input:disabled]:opacity-50 flex h-10 items-center whitespace-nowrap rounded-bl-md rounded-tl-md border border-e-0 bg-gray-100 px-3 py-2 text-base leading-none">
            {children}
        </span>
    );
};
