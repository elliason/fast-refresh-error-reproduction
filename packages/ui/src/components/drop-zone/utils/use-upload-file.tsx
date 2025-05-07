'use client';

import * as React from 'react';
import { useDropzone, type Accept, type DropEvent, type FileError, type FileRejection } from 'react-dropzone';

export type DropZoneFilesError = FileError | FileError[] | null;

/**
 * Hook for Drop Zone component
 * @description Hook that allows you to upload files by dragging and dropping them into the component or selecting from files. Gives ability to handle file upload errors or validate files before uploading.
 * @param accept - File types that are accepted by the component. Could be a string with a specific file type or an array of strings with file types. { 'image/png': ['.png', '.jpg', '.jpeg'] }
 * @param minSize - Minimum file size in bytes.
 * @param maxSize - Maximum file size in bytes.
 * @param maxFiles - Maximum number of files that could be uploaded.
 * @param disabled - Disables the ability to upload files.
 * @param onDrop - Callback that is called when files are dropped.
 * @param onDropAccepted - Callback that is called when files are accepted.
 * @param onDropRejected - Callback that is called when files are rejected.
 * @param onError - Callback that is called when an error occurs.
 * @param onCanceled - Callback that is called when the upload process is canceled. If it’s not provided, remove all selected files.
 * @param validator - Function that validates the file before uploading.
 */
export const useUploadFiles = ({
    accept,
    minSize,
    maxSize,
    maxFiles,
    disabled,
    files: filesFromProps,
    errorMessages: errorMessagesFromProps,
    onDrop,
    onRemove,
    onDropAccepted,
    onDropRejected,
    onError,
    onCanceled,
    validator,
    onChange,
}: {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    files?: File[];
    errorMessages?: string[];
    onDrop?: (acceptedFiles: File[]) => void;
    onRemove?: (file: File, index: number) => void;
    onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
    onDropRejected?: (fileRejections: FileRejection[]) => void;
    onChange?: (accepted: File[], rejected: readonly FileRejection[]) => void;
    onError?: (err: Error) => void;
    onCanceled?: () => void;
    validator?: <T extends File>(file: T) => DropZoneFilesError;
}) => {
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>(filesFromProps || []);
    const [errorMessages, setErrorMessages] = React.useState<string[]>(errorMessagesFromProps || []);

    React.useEffect(() => {
        filesFromProps && setUploadedFiles(filesFromProps || []);
    }, [filesFromProps]);

    React.useEffect(() => {
        errorMessagesFromProps && setErrorMessages(errorMessagesFromProps || []);
    }, [errorMessagesFromProps]);

    const onDropAcceptedInternal = React.useCallback(
        (acceptedFiles: File[], event: DropEvent) => {
            if (onDropAccepted) {
                onDropAccepted(acceptedFiles, event);
                return;
            }
            setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
        [onDropAccepted]
    );

    const onDropRejectedInternal = React.useCallback(
        (fileRejections: FileRejection[]) => {
            if (onDropRejected) {
                onDropRejected(fileRejections);
                // return; //rejection errors should still be pushed to errorMessages
            }
            fileRejections.map(({ errors }) =>
                errors.map((error) => setErrorMessages((prev) => [...prev, error.message]))
            );
        },
        [onDropRejected]
    );

    React.useEffect(() => {
        const clearErrors = setTimeout(() => {
            setErrorMessages([]);
        }, 150000);

        if (errorMessages.length > 0) {
            clearTimeout(clearErrors);
        }
    }, [errorMessages]);

    const { fileRejections, getRootProps, getInputProps } = useDropzone({
        accept,
        disabled,
        maxFiles,
        maxSize,
        minSize,
        onDrop,
        onDropAccepted: onDropAcceptedInternal,
        onDropRejected: onDropRejectedInternal,
        onError,
        validator,
    });

    React.useEffect(() => onChange?.(uploadedFiles, fileRejections), [uploadedFiles, fileRejections]);

    const handleDeleteFile = React.useCallback(
        (index: number) => {
            const file = uploadedFiles[index];
            if (onRemove && file) {
                onRemove(file, index);
            }
            setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        },
        [onRemove, uploadedFiles]
    );

    const handleDeleteAllFiles = React.useCallback(() => {
        if (onCanceled) {
            onCanceled();
            return;
        }
        setUploadedFiles([]);
    }, [onCanceled]);

    return {
        errorMessages,
        fileRejections,
        uploadedFiles,
        getRootProps,
        getInputProps,
        handleDeleteFile,
        handleDeleteAllFiles,
    };
};
