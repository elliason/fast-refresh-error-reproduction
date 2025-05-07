'use client';

import { useEffect, useState } from 'react';
import { DatePicker } from '#components/date-picker';
import { TimePicker } from '#components/time-picker';
import { format, parseISO } from 'date-fns';

type DateTimePickerComponentProps = {
    id?: string;
    onChange?: (dateTime: string) => void;
    value?: string;
    onBlur?: () => void;
    isValid?: boolean;
};

export const DateTimePicker = ({ onChange, value, onBlur, isValid, id }: DateTimePickerComponentProps) => {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        if (value) {
            const [datePart, rest] = value.split('T');
            const [timePart, zonePart] = rest?.split('+') || ['', ''];

            const dateTimeString = `${datePart}T${timePart || ''}+${zonePart || ''}`;

            const parsedDate = parseISO(dateTimeString);

            if (!isNaN(parsedDate.getTime())) {
                setDate(parsedDate);
                setTime(timePart || '');
            }
        }
    }, [value]);

    const handleDateTimeChange = (newDate: Date | null, newTime: string) => {
        if (newDate && newTime) {
            const formattedDate = format(newDate, 'yyyy-MM-dd');
            const formattedTime = newTime.length === 5 ? `${newTime}:00` : newTime;

            const timezoneOffset = newDate.getTimezoneOffset();
            const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
                .toString()
                .padStart(2, '0');

            const offsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
            const offsetSign = timezoneOffset > 0 ? '-' : '+';

            const timezoneString = `${offsetSign}${offsetHours}:${offsetMinutes}`;

            const dateTimeString = `${formattedDate}T${formattedTime}${timezoneString}`;

            onChange && onChange(dateTimeString);
        }
    };
    return (
        <div className="flex gap-2" id={id}>
            <DatePicker
                id={id ? `${id}-date` : undefined}
                onDateChange={(newDate) => {
                    setDate(newDate);
                    handleDateTimeChange(newDate, time);
                }}
                onBlur={onBlur}
                isValid={isValid}
            />
            <TimePicker
                formItemId={id ? `${id}-time` : undefined}
                value={time}
                onChange={(newTime) => {
                    setTime(newTime);
                    handleDateTimeChange(date, newTime);
                }}
                onBlur={onBlur}
                isValid={isValid}
            />
        </div>
    );
};
