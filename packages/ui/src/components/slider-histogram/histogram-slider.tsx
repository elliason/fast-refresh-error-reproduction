'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';

interface HistogramColorConfig {
    active: string;
    inactive: string;
}

export interface HistogramConfig {
    fill: HistogramColorConfig;
    stroke?: HistogramColorConfig;
}

export interface HistogramDataItem {
    value: number;
}

export type HistogramData = HistogramDataItem[];

/**
 * Histogram appears above slider.
 * You can configure the fill and stroke color for active / inactive columns.
 * Active columns are the ones within selected range.
 */
const Histogram = ({
    histogramData,
    histogramConfig,
    relativeSliderValue,
}: {
    histogramData: HistogramData;
    histogramConfig: HistogramConfig;
    relativeSliderValue: [number, number];
}) => {
    const leftThumbIndex = (relativeSliderValue[0] * histogramData.length) / 100;
    const rightThumbIndex = (relativeSliderValue[1] * histogramData.length) / 100;

    return (
        <ResponsiveContainer width="100%" height={100}>
            <BarChart data={histogramData}>
                <Bar dataKey="value">
                    {histogramData.map((_, index) => {
                        const isInsideSelectedRange = leftThumbIndex <= index + 1 && rightThumbIndex >= index;

                        return (
                            <Cell
                                fill={
                                    isInsideSelectedRange ? histogramConfig.fill.active : histogramConfig.fill.inactive
                                }
                                stroke={
                                    isInsideSelectedRange
                                        ? histogramConfig.stroke?.active
                                        : histogramConfig.stroke?.inactive
                                }
                                key={`cell-${index}`}
                            />
                        );
                    })}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const HistogramSlider = ({
    ref,
    className,
    'data-testid': dataTestId = 'slider',
    histogramData,
    histogramConfig,
    ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
    'data-testid'?: string;
    histogramData: HistogramData;
    histogramConfig: HistogramConfig;
}) => {
    const [value, setValue] = React.useState(props.defaultValue);

    if (!props.defaultValue || props.defaultValue.length !== 2 || value?.length !== 2 || !props.min || !props.max) {
        return;
    }

    const handleValueChange = (newValue: number[]) => {
        setValue(newValue);
        if (props.onValueChange) {
            props.onValueChange(newValue);
        }
    };

    // converts slider values into percentages relative to the defined range, facilitating visualization by mapping them within a standardized scale
    const calculateRelativeSliderValue = (
        sliderValue: [number, number],
        min: number,
        max: number
    ): [number, number] => {
        const targetRange = max - min;

        const percentages: [number, number] = [
            ((sliderValue[0] - min) / targetRange) * 100,
            ((sliderValue[1] - min) / targetRange) * 100,
        ];

        return percentages;
    };

    return (
        <div>
            <Histogram
                histogramData={histogramData}
                histogramConfig={histogramConfig}
                relativeSliderValue={calculateRelativeSliderValue(value as [number, number], props.min, props.max)}
            />
            <SliderPrimitive.Root
                ref={ref}
                className={cn('relative flex w-full touch-none select-none items-center', className)}
                data-testid={dataTestId}
                onValueChange={handleValueChange}
                {...props}
            >
                <SliderPrimitive.Track
                    className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100"
                    data-testid="track"
                >
                    <SliderPrimitive.Range className="bg-active absolute h-full" data-testid="range" />
                </SliderPrimitive.Track>

                <SliderPrimitive.Thumb
                    className="bg-active ring-offset-background focus-visible:ring-ring size-5 block rounded-full border-2 border-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    data-testid="thumb"
                />
                <SliderPrimitive.Thumb
                    className="bg-active ring-offset-background focus-visible:ring-ring size-5 block rounded-full border-2 border-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    data-testid="thumb"
                />
            </SliderPrimitive.Root>
        </div>
    );
};
export { HistogramSlider };
