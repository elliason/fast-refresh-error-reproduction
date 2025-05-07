/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FieldValues } from 'react-hook-form';
import { z } from 'zod';
import type { RecursiveValidationObject } from '../schema/form-server-state.js';

export const getValidationResultsFromZod = <Inputs extends FieldValues>(
    data: Inputs,
    error?: z.ZodError<Inputs>
): RecursiveValidationObject<Inputs> => {
    const getValueByPath = (obj: any, path: Array<string | number>): any => {
        return path.reduce((current, key) => (current && current[key] !== undefined ? current[key] : undefined), obj);
    };
    const dataWithNoError: RecursiveValidationObject<Inputs> = Object.entries(data).reduce((prev, [key, value]) => {
        return {
            ...prev,
            [key]: {
                value: value,
                invalid: false,
            },
        };

        return prev;
    }, {} as RecursiveValidationObject<Inputs>);

    const result = error?.issues.reduce((prev, act) => {
        const joinedPath = act.path.join('.');

        const value = getValueByPath(data, act.path);

        if (act.path[0]) {
            return {
                ...prev,
                [joinedPath]: {
                    value: value,
                    invalid: true,
                    issue: act,
                },
            };
        }
        return prev;
    }, {} as RecursiveValidationObject<Inputs>);
    console.log('dataWithNoError', dataWithNoError, 'result', result, 'konec');
    return result ? { ...dataWithNoError, ...result } : dataWithNoError;
};
