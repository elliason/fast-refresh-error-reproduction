'use client';

import type { ComponentPropsWithRef } from 'react';
import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form';
import { FormBasic } from './form-basic.js';

export type FormProps<Inputs extends FieldValues = FieldValues> = Omit<
    ComponentPropsWithRef<typeof FormBasic<Inputs>>,
    'form'
> &
    UseFormProps<Inputs>;

/**
 * Form component based on react-hook-form.
 * Supports all react-hook-form useForm's props.
 * Use together with `Field` components.
 *
 * @param [props.onClearServerErrors] - Optional callback function to clear server-side validation errors before the form is submitted.
 * @param [props.action] - The form action, can be either a function to handle form data submission or a string URL for server-side submission.
 * @param [props.onSubmit] - A submit handler function called when the form is submitted successfully.
 * @param [props.DevTool] - Pass a React Hook Form DevTool component to display the react-hook-form's developer tool for debugging purposes. This is better to pass from outside as it is not SSR compatible.
 * @param [props.children] - Form elements and content, typically input fields, buttons, and other components.
 * @param [props.onReset] - Callback function called when the form is reset, often used to clear errors or reset form state.
 * @param [props.onInvalid] - Callback function triggered when the form fails validation.
 * @param [props.ref] - A forwarded ref for the underlying form element.
 * @param [props.mode] - Validation strategy before submitting behaviour.
 * @param [props.reValidateMode] - Validation strategy after submitting behaviour.
 * @param [props.defaultValues] - Default values for the form.
 * @param [props.values] - Reactive values to update the form values.
 * @param [props.errors] - Reactive errors to update the form errors.
 * @param [props.resetOptions] - Option to reset form state update while updating new form values.
 * @param [props.criteriaMode] - Display all validation errors or one at a time.
 * @param [props.shouldFocusError] - Enable or disable built-in focus management.
 * @param [props.delayError] - Delay error from appearing instantly.
 * @param [props.shouldUseNativeValidation] - Use browser built-in form constraint API.
 * @param [props.shouldUnregister] - Enable and disable input unregister after unmount.
 * @param [props.disabled] - Disable the entire form with all associated inputs.
 *
 * @example
 * function Page() {
 *   return (
 *     <Form
 *       defaultValues={{ name: 'Jiří Kára' }}
 *       onSubmit={(data) => console.log(data)}
 *       DevTool={DevTool}
 *     >
 *       <Field name="name">
 *         <Input required />
 *         <Message match='required'/>
 *       </Field>
 *       <Button type="submit">Submit</Button>
 *     </Form>
 *   );
 * }
 */
export const Form = <Inputs extends FieldValues>({
    defaultValues,
    mode,
    reValidateMode,
    resetOptions,
    resolver,
    values,
    errors,
    criteriaMode,
    delayError,
    shouldUseNativeValidation,
    shouldUnregister,
    shouldFocusError,
    disabled,
    progressive,
    ...props
}: FormProps<Inputs>) => {
    const useFormProps: UseFormProps<Inputs> = {
        ...(defaultValues !== undefined ? { defaultValues } : {}),
        ...(mode !== undefined ? { mode } : {}),
        ...(reValidateMode !== undefined ? { reValidateMode } : {}),
        ...(resetOptions !== undefined ? { resetOptions } : {}),
        ...(resolver !== undefined ? { resolver } : {}),
        ...(values !== undefined ? { values } : {}),
        ...(errors !== undefined ? { errors } : {}),
        ...(criteriaMode !== undefined ? { criteriaMode } : {}),
        ...(shouldFocusError !== undefined ? { shouldFocusError } : {}),
        ...(delayError !== undefined ? { delayError } : {}),
        ...(shouldUseNativeValidation !== undefined ? { shouldUseNativeValidation } : {}),
        ...(shouldUnregister !== undefined ? { shouldUnregister } : {}),
        ...(disabled !== undefined ? { disabled } : {}),
        ...(progressive !== undefined ? { progressive } : {}),
    } satisfies UseFormProps<Inputs>;
    console.log('useFormProps', useFormProps);
    const form = useForm<Inputs>(useFormProps);
    return <FormBasic<Inputs> {...props} form={form} />;
};
