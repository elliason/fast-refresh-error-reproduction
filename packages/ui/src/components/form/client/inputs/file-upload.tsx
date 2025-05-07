'use client';

import * as React from 'react';
import { DropArea, DropedFilesDashboard, ErrorMessages, FileUpload } from '#components/file-upload';
import type { Upload, UploadRejection } from '#components/file-upload';
import { useToast } from '#components/toast';
import { useController, useFormContext, type RegisterOptions, type ValidationMode } from 'react-hook-form';
import { useField } from '../field/field-context.js';
import { useDescriptionIdsContext } from '../message-description-ids/description-ids-context.js';
import { renderValidityAttributes } from '../utils/renderValidityAttributes.js';

type FieldFileUploadProps = React.ComponentPropsWithoutRef<typeof FileUpload> & {
    ValidationMode?: ValidationMode;
    registerOptions?: RegisterOptions;
    required?: boolean;
};

const FieldFileUpload = ({ registerOptions, required, ValidationMode, maxFiles, ...props }: FieldFileUploadProps) => {
    const { name, isValid } = useField();
    const { getFieldDescription } = useDescriptionIdsContext('FieldFileUpload');
    const [fileIDs, setFileIDs] = React.useState<string[]>([]);

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

    const handleUploadAccepted = (files: Upload[]) =>
        setFileIDs((prev) => {
            const ids = files.map((file) => file.id!);
            const newFiles = [...prev, ...ids];
            field.onChange(newFiles);
            trigger(name);
            return newFiles;
        });

    const handleUploadRejected = (rejections: UploadRejection[]) => {
        rejections.forEach(({ errors }) =>
            errors.forEach(({ message }) => toast({ variant: 'destructive', description: message }))
        );
    };

    const handleDropRejected = (rejections: UploadRejection[]) => {
        rejections.forEach(({ errors }) =>
            errors.forEach(({ message }) => toast({ variant: 'destructive', description: message }))
        );
    };

    const handleRemove = (file: File, index: number) =>
        setFileIDs((prev) => {
            const newFiles = [...prev];
            newFiles.splice(index, 1);
            field.onChange(newFiles);
            trigger(name);
            return newFiles;
        });

    return (
        <FileUpload
            {...renderValidityAttributes({ isSubmitted, isValid })}
            onUploadAccepted={handleUploadAccepted}
            onUploadRejected={handleUploadRejected}
            onDropRejected={handleDropRejected}
            onRemove={handleRemove}
            {...props}
        />
    );
};

const FieldFileUploadDropArea = DropArea;

const FieldFileUploadDropedFilesDashboard = DropedFilesDashboard;

const FieldFileUploadErrorMessages = ErrorMessages;

export { FieldFileUpload, FieldFileUploadDropArea, FieldFileUploadDropedFilesDashboard, FieldFileUploadErrorMessages };
