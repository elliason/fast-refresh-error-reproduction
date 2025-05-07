'use client';

import { type ReactNode } from 'react';
import { Button } from '#components/button';
import { Plus } from 'lucide-react';
import {
    useFieldArray,
    useFormContext,
    type ArrayPath,
    type FieldArray,
    type FieldValues,
    type Path,
    type UseFieldArrayReturn,
} from 'react-hook-form';
import { ArrayFieldActionButtonsWrapper } from './components/array-field-action-buttons.wrapper.js';
import { useConstraints } from './hooks/use-constraints.js';
import React from 'react';

export type ArrayFieldRenderProps<FormValues extends FieldValues = FieldValues> = {
    fieldPath: `${ArrayPath<FormValues>}.${number}`;
    array: UseFieldArrayReturn<FormValues, ArrayPath<FormValues>>;
    field: UseFieldArrayReturn<FormValues, ArrayPath<FormValues>>['fields'][number] | unknown;
    index: number;
    formItemId?: string;
    ActionButton: ReactNode;
};

export type ArrayFieldOtherProps<FormValues extends FieldValues = FieldValues> = {
    array: UseFieldArrayReturn<FormValues, ArrayPath<FormValues>>;
    onAdd?: (index: number) => void;
    onRemove?: (index: number) => void;
};

export type ArrayFieldButtonVariant = {
    buttonText?: string;
    variant: 'textLine';
    children?: ReactNode;
};
export type ArrayFieldTextLineVariants = {
    buttonText?: never;
    variant: 'buttons';
    children?: ReactNode;
};
export type ArrayFieldCustomVariant<FormValues extends FieldValues = FieldValues> = {
    buttonText?: never;
    variant: 'custom';
    children?: (props: {
        array: UseFieldArrayReturn<FormValues, ArrayPath<FormValues>>;
        onAdd?: (index: number) => void;
        onRemove?: (index: number) => void;
    }) => ReactNode;
};

export type Variants<FormValues extends FieldValues = FieldValues> =
    | ArrayFieldButtonVariant
    | ArrayFieldTextLineVariants
    | ArrayFieldCustomVariant<FormValues>;

export type ArrayFieldConstraint<FormValues extends FieldValues = FieldValues> = {
    type: 'onlyOnce';
    value: boolean | string;
    path: Path<FormValues>;
};

export type ArrayFieldProps<FormValues extends FieldValues = FieldValues> = {
    render: (props: ArrayFieldRenderProps<FormValues>) => React.ReactNode;
    arrayPath: ArrayPath<FormValues>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    defaultValues: FieldArray<FormValues, ArrayPath<FormValues>>;
    constraints?: ArrayFieldConstraint<FormValues>[];
    debug?: boolean;
    onAdd?: (index: number) => void;
    onRemove?: (index: number) => void;
    renderEmpty?: (props: {
        array: UseFieldArrayReturn<FormValues, ArrayPath<FormValues>>;
        defaultValues: FieldArray<FormValues, ArrayPath<FormValues>>;
    }) => React.ReactNode;
} & Variants<FormValues>;

export const ArrayField = <FormValues extends FieldValues = FieldValues>({
    render,
    children,
    arrayPath,
    defaultValues,
    variant,
    buttonText = 'Přidat další řádek',
    constraints,
    debug = false,
    onAdd,
    onRemove,
    renderEmpty,
}: ArrayFieldProps<FormValues>) => {
    const { control, setValue } = useFormContext<FormValues>();
    const array = useFieldArray<FormValues, ArrayPath<FormValues>>({
        control,
        name: arrayPath,
    });

    if (debug) {
        console.log(`array field "${arrayPath}":`, array.fields);
    }

    const resultArrayField =
        array.fields.length > 0 ? array.fields : [{ ...(defaultValues as {}), id: 'defaultForFirstElement' }];

    useConstraints(control, arrayPath, resultArrayField, setValue, constraints);

    const fieldElements = (() => {
        if (renderEmpty && array.fields.length === 0) {
            return renderEmpty({ array, defaultValues });
        }

        return resultArrayField.map((field, index) => {
            if (debug) {
                console.log(`array field "${arrayPath}" render ${index}`, field);
            }

            if (array.fields.length === 0 && renderEmpty) {
                return renderEmpty({ array, defaultValues });
            }
            return (
                <React.Fragment key={field.id}>
                    {render({
                        field,
                        index,
                        array,
                        fieldPath: `${arrayPath}.${index}`,
                        ActionButton: (
                            <ArrayFieldActionButtonsWrapper
                                onAdd={() => {
                                    array.append(defaultValues);
                                    if (onAdd) {
                                        onAdd(index + 1);
                                    }
                                }}
                                onRemove={() => {
                                    array.remove(index);
                                    if (onRemove) {
                                        onRemove(index);
                                    }
                                }}
                                isRemoveButtonVisible={index !== 0 || index !== resultArrayField.length - 1}
                                isAddButtonVisible={index === resultArrayField.length - 1 && variant === 'buttons'}
                            />
                        ),
                    })}
                </React.Fragment>
            );
        });
    })();

    return (
        <>
            <div className="array-field space-y-4">{fieldElements}</div>
            {(() => {
                if (variant === 'textLine') {
                    return (
                        <>
                            <div className="flex items-center gap-2">
                                <Button
                                    data-testid="addButton"
                                    type="button"
                                    variant="link"
                                    onClick={() => {
                                        array.append(defaultValues);
                                        if (onAdd) {
                                            onAdd(array.fields.length);
                                        }
                                    }}
                                >
                                    <Plus aria-hidden="true" />
                                    {buttonText}
                                </Button>
                            </div>
                            {children}
                        </>
                    );
                }
                if (variant === 'buttons') {
                    return <>{children}</>;
                }
                if (variant === 'custom') {
                    return <>{children?.({ array, onAdd, onRemove })}</>;
                }
            })()}
        </>
    );
};
