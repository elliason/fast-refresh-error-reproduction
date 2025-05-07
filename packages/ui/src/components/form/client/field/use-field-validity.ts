'use client';

import { useEffect } from 'react';
import get from 'lodash/get.js';
import { useFormState, type FieldError } from 'react-hook-form';

const serverErrors = new Set<string>();

export const useFieldValidity = ({ name, serverInvalid }: { name: string; serverInvalid: boolean }) => {
    const { errors, touchedFields, dirtyFields } = useFormState({ name, exact: true });

    const nameSplited = name.split('.');
    const useArrayName = nameSplited.length > 1;

    const isTouched = Boolean(useArrayName ? get(touchedFields, nameSplited) : touchedFields[name]);
    const isDirty = Boolean(useArrayName ? get(dirtyFields, nameSplited) : dirtyFields[name]);

    const fieldError = (useArrayName ? get(errors, nameSplited) : errors[name]) as FieldError | undefined;
    const isValid = (() => {
        if (serverInvalid) {
            return false;
        }

        if (fieldError && 'type' in fieldError && fieldError.type !== undefined) {
            return false;
        }

        return true;
    })();

    useEffect(() => {
        //if (!containerContext) return;
        if (fieldError) {
            //containerContext.setIsError(true);
            return;
        }
        if (serverInvalid) {
            serverErrors.add(name);
            //containerContext.setIsError(true);
            return;
        }

        if (serverErrors.size > 1) {
            //containerContext && containerContext.setIsError(true);
        } else {
            serverErrors.delete(name);
            //containerContext.setIsError(false);
        }
    }, [fieldError, serverInvalid]);

    return {
        isValid,
        fieldError,
        isDirty,
        isTouched,
    };
};
