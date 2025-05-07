'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '#components/button';
import { Calendar } from '#components/calendar';
import type { CalendarProps } from '#components/calendar/';
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover';
import { cn } from '#lib/utils';
import { format, type Locale } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

export type DatePickerProps = {
    id?: string;
    shouldCloseOnSelect?: boolean;
    buttonProps?: ButtonProps;
    Icon?: ReactNode;
    isValid?: boolean;
    forceOpen?: boolean;
    placeHolder?: string;
    language?: Locale;
    calendarProps?: Pick<CalendarProps, 'fromDate' | 'toDate'>;
    onDateChange?: (date: Date) => void;
    onBlur?: () => void;
    controlledDate?: Date;
};

/**
 * DatePicker component providing a date selection functionality with a calendar popover.
 *
 * @component
 *
 * @param [props.shouldCloseOnSelect] - Determines whether the popover should close after a date is selected.
 * @param [props.buttonProps] - Props passed to the internal Button component.
 * @param [props.Icon] - An optional icon component to display inside the button.
 * @param [props.forceOpen] - Forces the calendar popover to remain open regardless of user interaction.
 * @param [props.buttonText] - The text displayed on the button when no date is selected.
 * @param [props.language] - The locale used for date formatting, default is Czech.
 * @param [props.calendarProps] - Additional props passed to the Calendar component, such as date range limits.
 * @param [props.onDateChange] - A callback function called when a date is selected.
 * @param [props.controlledDate] - A controlled date value.
 * @param [props.isValid] - Determines whether the date picker is in a valid state.
 * @param [props.onBlur] - A callback function called when the date picker loses focus.
 * @returns {React.ReactElement} The DatePicker component.
 *
 * @example
 * // Basic usage of the DatePicker component
 * function App() {
 *   return (
 *     <DatePicker
 *       buttonText="Select a date"
 *       calendarProps={{ fromDate: new Date(2023, 0, 1), toDate: new Date(2023, 11, 31) }}
 *     />
 *   );
 * }
 */
export function DatePicker({
    buttonProps,
    Icon,
    forceOpen,
    shouldCloseOnSelect = true,
    language = cs,
    placeHolder = '--. ------. ----',
    calendarProps,
    onDateChange,
    onBlur,
    isValid = true,
    controlledDate,
    id,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date>();
    const [isOpen, setIsOpen] = React.useState(false);

    const isCalendarOpen = forceOpen ? forceOpen : isOpen;

    const handleDateSelect = (selectedDate?: Date) => {
        setDate(selectedDate);
        onDateChange && selectedDate && onDateChange(selectedDate);
        shouldCloseOnSelect && setIsOpen(false);
    };
    const resultDate = date || controlledDate;
    return (
        <>
            <Popover open={isCalendarOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="input"
                        {...buttonProps}
                        className={cn(
                            '[&_svg]:text-muted-foreground w-52 justify-start text-left',
                            'rounded-md',
                            !date && 'text-muted-foreground',
                            isValid ? 'border-input' : 'border-destructive',
                            buttonProps?.className
                        )}
                        id={id}
                    >
                        {Icon || <CalendarIcon className="size-5" />}
                        {resultDate ? format(resultDate, 'PPP', { locale: language }) : <span>{placeHolder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={controlledDate || date}
                        onSelect={handleDateSelect}
                        onDayBlur={onBlur}
                        initialFocus
                        locale={language}
                        {...calendarProps}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}
