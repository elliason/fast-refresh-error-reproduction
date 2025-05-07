import { useEffect, useState } from 'react';
import { AutocompleteSelect } from '#components/select';
import { cn } from '#lib/utils';
import { Clock3Icon } from 'lucide-react';

type TimePickerProps = {
    id?: string;
    value: string | null;
    onChange: (time: string) => void;
    onBlur?: () => void;
    className?: string;
    isValid?: boolean;
    formItemId?: string;
};

const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    value: ('0' + i).slice(-2),
    label: ('0' + i).slice(-2),
}));

const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
    value: ('0' + i).slice(-2),
    label: ('0' + i).slice(-2),
}));
const defaultSecond = '00';

export const TimePicker = ({ onChange, value, isValid = true, formItemId }: TimePickerProps) => {
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');

    useEffect(() => {
        if (value) {
            const [newHours, newMinutes] = value.split(':');
            newHours && setHours(newHours);
            newMinutes && setMinutes(newMinutes);
        }
    }, [value]);

    const handleOnChange = (newHours: string, newMinutes: string) => {
        if (!newHours) {
            return;
        }
        onChange(`${newHours}:${newMinutes || '00'}:${defaultSecond}`);
    };
    return (
        <div
            id={formItemId}
            className={cn(
                'border-input [&_svg]:text-muted-foreground bg-input-background inline-flex h-10 items-center rounded-md border shadow-inner [&_div]:bg-transparent',
                !isValid && 'border-red-800'
            )}
        >
            <Clock3Icon className="size-5 ml-3 shrink-0" />
            <AutocompleteSelect
                options={hoursOptions}
                value={hours}
                onValueChange={(newHour) => {
                    setHours(newHour);
                    handleOnChange(newHour, minutes);
                }}
                inputProps={{
                    placeholder: '--',
                    className: 'w-[19px] border-none pr-0',
                    searchPlaceholder: '',
                    type: 'number',
                    inputPattern: /^0$|^0\d$|^[1-9]$|^1\d$|^2[0-3]$/,
                }}
                triggerProps={{
                    id: formItemId ? `${formItemId}-hours` : undefined,
                    className: 'bg-transparent h-full min-w-[51px] border-none gap-0 pr-0 shadow-none',
                }}
                data-invalid={true}
            />
            <AutocompleteSelect
                options={minutesOptions}
                value={minutes}
                onValueChange={(newMinute) => {
                    setMinutes(newMinute);
                    handleOnChange(hours, newMinute);
                }}
                inputProps={{
                    placeholder: '--',
                    className: 'w-[19px] border-none',
                    searchPlaceholder: '',
                    type: 'number',
                    inputPattern: /^0$|^0\d$|^[1-9]$|^[1-5]\d$/,
                }}
                triggerProps={{
                    id: formItemId ? `${formItemId}-minutes` : undefined,
                    className: 'bg-transparent h-full min-w-[60px] border-none gap-0 pl-2 shadow-none',
                }}
            />
        </div>
    );
};
