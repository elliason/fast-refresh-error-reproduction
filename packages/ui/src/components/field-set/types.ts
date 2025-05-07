import * as React from 'react';

export type FieldSetRecord = Record<string, unknown>;

export type FieldSetData = FieldSetRecord[];

export interface FieldSetProps extends React.ComponentPropsWithRef<'div'> {
    getOptionsURL: string;
}
