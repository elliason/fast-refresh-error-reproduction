import { DateTimePicker } from '#components/date-time-picker';
import { Controller, useFormContext } from 'react-hook-form';
import { useField } from '../field/field-context.js';

export type DateTimePickerFieldProps = {
    required?: boolean;
};
const DateTimePickerField = ({ required }: DateTimePickerFieldProps) => {
    const { name, isValid, isServerInvalid, formItemId } = useField();
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <DateTimePicker
                        id={formItemId}
                        onChange={field.onChange}
                        value={field.value}
                        onBlur={field.onBlur}
                        isValid={isValid && !isServerInvalid}
                    />
                );
            }}
            name={name}
            rules={{ required }}
        />
    );
};
export default DateTimePickerField;
