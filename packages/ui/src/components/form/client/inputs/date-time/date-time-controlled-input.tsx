import { useCallback } from 'react';
import { Input } from '#components/input';
import { cn } from '#lib/utils';
import {
    Controller,
    useFormContext,
    type FieldValues,
    type RegisterOptions,
    type ValidationRule,
} from 'react-hook-form';
import { canBeValidDate } from '../../../../../lib/utils/date.js';
import { useField } from '../../field/field-context.js';
import { useDescriptionIdsContext } from '../../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../../utils/renderValidityAttributes.js';

/**
 * Takes a date and returns a string in the format of 'YYYY-MM-DDTHH:mm' - compatible with the datetime-local input type
 */
const getDateTimeDisplayValue = (date: Date | string | null) => {
    if (typeof date === 'string') {
        return date;
    }

    if (date instanceof Date) {
        if (!canBeValidDate(date)) {
            return '';
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    return '';
};

const isMinMaxValidationRuleValid = (
    minMax: ValidationRule<string | number> | undefined
): minMax is string | number => {
    if (!minMax) {
        return false;
    }

    if (typeof minMax === 'string' || typeof minMax === 'number') {
        return canBeValidDate(minMax);
    }

    if (minMax instanceof Date && canBeValidDate(minMax)) {
        return true;
    }

    return false;
};

export const DateTimeControlledInput = ({
    className,
    ...rules
}: { className?: string } & Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>) => {
    const { control, formState, resetField } = useFormContext();
    const { name, isValid, formItemId } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('DateTimeControlledInput');

    if (rules.min && !isMinMaxValidationRuleValid(rules.min)) {
        throw new Error('Invalid min date value');
    }

    if (rules.max && !isMinMaxValidationRuleValid(rules.max)) {
        throw new Error('Invalid max date value');
    }

    const resetFieldValue = useCallback(() => {
        resetField(name, {
            keepDirty: true,
            keepTouched: true,
        });
    }, [resetField, name]);

    return (
        <Controller
            control={control}
            render={({ field: { onChange, value, ...registrationRest }, fieldState }) => {
                return (
                    <>
                        <Input
                            id={formItemId}
                            type="datetime-local"
                            value={getDateTimeDisplayValue(value)}
                            onChange={(e) => {
                                const value = e.currentTarget.value;

                                if (!canBeValidDate(value)) {
                                    resetFieldValue();
                                    return;
                                }

                                return onChange(new Date(value));
                            }}
                            // disable default browser behaviour of showing built-in error message on hover
                            title=""
                            {...registrationRest}
                            className={cn(className, 'w-auto')}
                            {...renderValidityAttributes({ isValid, isSubmitted: formState.isSubmitted })}
                            aria-describedby={getFieldDescription(name)}
                        />
                    </>
                );
            }}
            name={name}
            rules={{
                ...rules,
                ...(rules.min || rules.max
                    ? {
                          validate: {
                              ...(rules.min && isMinMaxValidationRuleValid(rules.min)
                                  ? {
                                        min: (value: Date) => {
                                            if (value < new Date(rules.min as string | number | Date)) {
                                                return 'Incorrect min value for date';
                                            }
                                        },
                                    }
                                  : {}),
                              ...(rules.max && isMinMaxValidationRuleValid(rules.max)
                                  ? {
                                        max: (value: Date) => {
                                            if (value > new Date(rules.max as string | number | Date)) {
                                                return 'Incorrect max value for date';
                                            }
                                        },
                                    }
                                  : {}),
                              ...(rules.validate || {}),
                          },
                      }
                    : {}),
            }}
        />
    );
};
