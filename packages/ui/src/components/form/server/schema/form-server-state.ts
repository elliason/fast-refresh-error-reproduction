import { type FieldValues } from 'react-hook-form';
import { z } from 'zod';

export type CustomIssue = {
    type: keyof ValidityState;
    message: string;
};

export type ServerFieldIssue = z.ZodIssue | CustomIssue;

/**
 * Result of field validation, this could be zod parse or custom validation
 */
export type FieldValidationResult<Value> = {
    value: Value;
    invalid: boolean;
    issue?: ServerFieldIssue;
};

/**
 * Recursive type for nested fields, takes original data and adds validation result to each field
 * @example
 * type ExampleInput = {
 *   simple: string;
 *   nested: {
 *       number: number;
 *       deepNested: {
 *           boolean: boolean;
 *       };
 *   };
 *};
 *
 *const example: RecursiveValidationObject<ExampleInput> = {
 *   simple: { value: 'Hello', isValid: true, issue: { type: 'invalid', message: 'invalid field', data: 'Hello' } },
 *   nested: {
 *       number: {
 *           value: 5,
 *           isValid: true,
 *           issue: {
 *               type: 'invalid',
 *               message: 'invalid field',
 *               data: 5,
 *           },
 *       },
 *       deepNested: {
 *           boolean: {
 *               value: true,
 *               isValid: false,
 *               issue: {
 *                   type: 'invalid',
 *                   message: 'invalid field',
 *                   data: true,
 *               },
 *           },
 *       },
 *   },
 *};
 *
 */
export type RecursiveValidationObject<T extends FieldValues> = {
    [P in keyof T]: T[P] extends Date
        ? FieldValidationResult<T[P]>
        : T[P] extends string[]
        ? FieldValidationResult<T[P]>
        : T[P] extends object
        ? T[P] extends Record<string, any>
            ? RecursiveValidationObject<T[P]>
            : FieldValidationResult<T[P]>
        : FieldValidationResult<T[P]>;
};

/**
 * Server state of the form,
 * this is returned from server actions, and is also type of initial state of useFormState hook
 */
export type FormServerState<FormValues extends FieldValues = FieldValues> = {
    success: boolean | undefined;
    message: string; // server message for whole form
    fields: RecursiveValidationObject<FormValues> | undefined;
    errorCode?: 'invalid_data' | 'unknown_error';
};
