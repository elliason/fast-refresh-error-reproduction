import { useEffect } from 'react';
import type { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export const useGuardValues = <FormValues extends FieldValues = FieldValues>(
    watchedConstraintsMap: { name: string; value: undefined; valueForCompare: boolean | string }[][],
    lastValue: React.RefObject<Record<string, string>>,
    setValue: UseFormSetValue<FormValues>
) => {
    useEffect(() => {
        watchedConstraintsMap.forEach((constraints, index) => {
            const filtered = constraints.filter((constraint) => {
                if (constraint.valueForCompare === false) {
                    return !!constraint.value === constraint.valueForCompare;
                }
                return constraint.value === constraint.valueForCompare;
            });
            // if there are no values, we set the last value to an empty string
            if (filtered.length === 0) {
                lastValue.current[index] = '';
            }
            if (filtered.length === 1) {
                lastValue.current[index] = filtered?.[0]?.name || '';
            } else if (filtered.length > 1 && lastValue.current[index]) {
                const newCheckedField = filtered.filter((constraint) => constraint.name !== lastValue.current[index]);

                setValue(
                    lastValue.current[index] as Path<FormValues>,
                    (typeof newCheckedField?.[0]?.valueForCompare === 'string'
                        ? ''
                        : !newCheckedField?.[0]?.valueForCompare) as PathValue<FormValues, Path<FormValues>>
                );
                lastValue.current[index] = newCheckedField?.[0]?.name || '';
            }
        });
    }, [watchedConstraintsMap, setValue]);
};
