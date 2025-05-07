import * as React from 'react';
import { cn } from '#lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    'data-testid'?: string;
}
/**
 * TextareaField component provides a text input area with integrated form validation using `react-hook-form`.
 *
 * @component
 *
 * @param {boolean} [props.required] - Indicates if the textarea field is required.
 * @param {ValidationMode} [props.ValidationMode] - The mode of validation for the textarea field. Can be 'onChange', 'onBlur', etc.
 *
 * @returns {React.ReactElement} The TextareaField component.
 *
 * @example
 * // Basic usage of the TextareaField component
 * function MyForm() {
 *   return (
 *     <form>
 *       <TextareaField required={true} ValidationMode="onChange" />
 *     </form>
 *   );
 * }
 */
export const Textarea = ({ ref, className, ...props }: React.ComponentPropsWithRef<'textarea'>) => {
    return (
        <textarea
            className={cn(
                'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring bg-input-background flex min-h-[80px] w-full rounded-md border px-3 py-2 shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
            data-testid="textarea"
        />
    );
};
