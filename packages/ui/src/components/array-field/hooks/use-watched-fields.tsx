import { useMemo } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';

export const useWatchedFields = <FormValues extends FieldValues = FieldValues>(
    fieldNames: { fieldName: string; valueForCompare: boolean | string }[],
    resultArrayField: { id: string }[],
    fieldPath: string,
    watchedFields: string[],
    watchedValues: PathValue<FormValues, Path<FormValues>>[]
) => {
    return useMemo(() => {
        return fieldNames.map((field) => {
            return resultArrayField.map((_, index) => {
                const watchedFieldName = `${fieldPath}.${index}.${field.fieldName}`;
                const watchedFieldIndex = watchedFields.indexOf(watchedFieldName as Path<FormValues>);
                const value = watchedValues ? watchedValues[watchedFieldIndex] : undefined;

                return { name: watchedFieldName, value, valueForCompare: field.valueForCompare };
            });
        });
    }, [fieldNames, watchedFields, watchedValues, resultArrayField, fieldPath]);
};
