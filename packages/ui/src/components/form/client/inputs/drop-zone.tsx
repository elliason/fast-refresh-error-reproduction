'use client';

import * as React from 'react';
import {
    DropArea,
    DropedFilesDashboard,
    DropZone,
    ErrorMessages,
    type DropEvent,
    type FileRejection,
} from '#components/drop-zone';
import { useToast } from '#components/toast';
import { useController, useFormContext, type RegisterOptions, type ValidationMode } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

type FieldDropZoneProps = React.ComponentPropsWithoutRef<typeof DropZone> & {
    ValidationMode?: ValidationMode;
    registerOptions?: RegisterOptions;
    required?: boolean;
};

const FieldDropZone = ({ registerOptions, required, ValidationMode, maxFiles, ...props }: FieldDropZoneProps) => {
    const { name, isValid } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('FieldDropZone');
    const [files, setFiles] = React.useState<File[]>([]);

    const { toast } = useToast();

    const {
        control,
        formState: { isSubmitted },
        trigger,
    } = useFormContext();

    const { field } = useController({
        name,
        control,
        rules: {
            required,
            validate: {
                required: (files: string[]) => files && files?.length > 0,
                maxLength: (files: string[]) => (maxFiles ? files.length <= maxFiles : true),
            },
        },
    });

    const handleDropAccepted = (files: File[], event: DropEvent) =>
        setFiles((prev) => {
            const newFiles = [...prev, ...files];
            field.onChange(newFiles);
            trigger(name);
            return newFiles;
        });

    const handleDropRejected = (rejections: FileRejection[]) => {
        rejections.forEach(({ errors }) =>
            errors.forEach(({ message }) => toast({ variant: 'destructive', description: message }))
        );
    };

    const handleRemove = (file: File, index: number) =>
        setFiles((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            field.onChange(newFiles);
            trigger(name);
            return newFiles;
        });

    return (
        <DropZone
            files={files}
            {...renderValidityAttributes({ isSubmitted, isValid })}
            onDropAccepted={handleDropAccepted}
            onDropRejected={handleDropRejected}
            onRemove={handleRemove}
            {...props}
        />
    );
};

const FieldDropArea = DropArea;

const FieldDropedFilesDashboard = DropedFilesDashboard;

const FieldErrorMessages = ErrorMessages;

export { FieldDropZone, FieldDropArea, FieldDropedFilesDashboard, FieldErrorMessages };
