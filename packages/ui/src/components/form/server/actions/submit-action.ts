import { type FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { type FormServerState } from '../schema/form-server-state.js';
import { getValidationResultsFromZod } from '../utils/get-validation-results-from-zod.js';

export type Options = {
    validation: {
        zodSchema?: z.Schema;
    };
};

/**
 * Server Action responsible for handling Form submit
 * This action is meant to be used inside function marked with "use server"
 * Its type signature is similar to any Server Action, we just pass third additional param Options
 * Use options param to customize the action behavior
 */
export const submitAction = async <Inputs extends FieldValues>(
    payload: Inputs,
    zodSchema: z.Schema
): Promise<FormServerState<Inputs>> => {
    try {
        const result = zodSchema?.parse(payload);
        console.log('Zod validation passed', result);

        return {
            success: true,
            message: 'Server validation passed1',
            fields: result,
        };
    } catch (error) {
        // handle zod  error
        if (error instanceof z.ZodError) {
            // TODO: better error handling with Effect - Parsing Error
            console.error('Zod  failed', payload, error.issues);

            const fields = getValidationResultsFromZod<Inputs>(payload as Inputs, error);

            console.log('Fields result', fields);

            return {
                success: false,
                message: 'Server validation failed - invalid data2',
                fields,
                errorCode: 'invalid_data',
            };
        }
        console.error('unknown error', error);

        return {
            success: false,
            message: 'Server validation failed - unknown errorrrr3',
            errorCode: 'unknown_error',
            fields: getValidationResultsFromZod<Inputs>(payload as Inputs) || {},
        };
    }
};
