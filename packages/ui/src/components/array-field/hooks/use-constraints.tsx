import { useRef } from 'react';
import { useWatch, type Control, type FieldValues, type Path, type UseFormSetValue } from 'react-hook-form';
import type { ArrayFieldConstraint } from '../array-field.js';
import { useGuardValues } from './use-guard-values.js';
import { useWatchedFields } from './use-watched-fields.js';

export const useConstraints = <FormValues extends FieldValues = FieldValues>(
    control: Control<FormValues>,
    fieldPath: string,
    resultArrayField: { id: string }[],
    setValue: UseFormSetValue<FormValues>,
    constraints?: ArrayFieldConstraint<FormValues>[]
) => {
    // the last value that had a true value is stored here. it is then used to change it to false when a new selected value is entered.
    // because this hook makes sure that there is always only one true value
    const lastValue = useRef<Record<string, string>>({});
    // return all field names available in from
    const getWatchedConstraints = (name?: Path<FormValues>) => {
        return resultArrayField.map((_, index) => `${fieldPath}.${index}.${name}`);
    };

    // select the fields we want to watch on only once and track their changes so we can react to them later
    const watchedFieldsAllPath = constraints?.flatMap((item) => getWatchedConstraints(item.path)) ?? [];

    // get value changes on monitored only once field
    const watchedValues = useWatch({
        control,
        name: watchedFieldsAllPath as Path<FormValues>[],
    });

    // getting the names of only those we want to track because of the only once condition. This name is just the last part of the path
    // it has to be separated because we don't know how many fields will be added to the array
    const fieldNames =
        constraints?.map((item) => ({
            fieldName: item.path.toString(),
            valueForCompare: item.value,
        })) ?? [];

    // converts monitored values to an array where each index is an array of monitored values with name and value. it is possible to refactor, as originally intended for better iteration
    const watchedConstraintsMap = useWatchedFields<FormValues>(
        fieldNames,
        resultArrayField,
        fieldPath,
        watchedFieldsAllPath,
        watchedValues
    );

    // hook that makes sure that only one value of the monitored field is true
    useGuardValues(watchedConstraintsMap, lastValue, setValue);
};
