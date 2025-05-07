import * as React from 'react';
import type { ComponentPropsWithRef } from 'react';
import type { FieldValues } from 'react-hook-form';
import { FormBasic } from './form-basic.js';

/**
 * FormBasic component providing form management and submission functionality integrated with react-hook-form.
 *
 * @component
 *
 * @param [props.defaultValues] - Optional default values for the form fields, used to initialize the form.
 * @param [props.onClearServerErrors] - Optional callback function to clear server-side validation errors before the form is submitted.
 * @param [props.action] - The form action, can be either a function to handle form data submission or a string URL for server-side submission.
 * @param [props.onSubmit] - A submit handler function called when the form is submitted successfully.
 * @param [props.form] - The react-hook-form's `useForm` return object, used to manage form state and validation.
 * @param [props.DevTool] - Pass a React Hook Form DevTool component to display the react-hook-form's developer tool for debugging purposes. This is better to pass from outside as it is not SSR compatible.
 * @param [props.children] - Form elements and content, typically input fields, buttons, and other components.
 * @param [props.onReset] - Callback function called when the form is reset, often used to clear errors or reset form state.
 * @param [props.onInvalid] - Callback function triggered when the form fails validation.
 * @param [props.ref] - A forwarded ref for the underlying form element.
 * @param [props.method] - The HTTP method used when submitting the form, default is 'POST'.
 * @returns {React.ReactElement} The FormBasic component.
 *
 * @example
 * // Basic usage of the FormBasic component with react-hook-form
 * function Page() {
 *   const form = useForm({
 *     defaultValues: { name: '' },
 *   });
 *
 *   const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), {
 *     ssr: false,
 *   });
 *
 *   return (
 *     <FormControlled
 *       form={form}
 *       onSubmit={(data) => console.log(data)}
 *       DevTool={DevTool}
 *     >
 *       <Input required />
 *       <Message match='required'/>
 *       <button type="submit">Submit</button>
 *     </FormControlled>
 *   );
 * }
 */
export type FormControlledProps<Inputs extends FieldValues = FieldValues> = ComponentPropsWithRef<
    typeof FormBasic<Inputs>
>;

export const FormControlled = <Inputs extends FieldValues>(props: FormControlledProps<Inputs>) => {
    return <FormBasic<Inputs> {...props} />;
};
