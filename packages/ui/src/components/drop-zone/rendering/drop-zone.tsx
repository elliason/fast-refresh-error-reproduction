'use client';

import * as React from 'react';
import { type Accept, type DropEvent, type FileRejection } from 'react-dropzone';
import { DropZoneContextProvider } from '../utils/drop-zone-context.js';
import { useUploadFiles, type DropZoneFilesError } from '../utils/use-upload-file.js';

type DropZoneProps = React.ComponentPropsWithoutRef<'div'> & {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    children: React.ReactNode;
    files?: File[];
    errorMessages?: string[];
    onDrop?: (acceptedFiles: File[]) => void;
    onRemove?: (file: File, index: number) => void;
    onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
    onDropRejected?: (fileRejections: FileRejection[]) => void;
    onError?: (err: Error) => void;
    validator?: <T extends File>(file: T) => DropZoneFilesError;
    onSubmitted?: (files: File[]) => void;
    onCanceled?: () => void;
};

/**
 * Component that allows to upload files by dragging and dropping them into the component or selecting from files.
 * @description Have to be used as a wrapper for DropArea, DropedFilesDashboard and DropZoneFooter components.
 * @param accept - File types that are accepted by the component. Could be a string with a specific file type or an array of strings with file types. { 'image/png': ['.png', '.jpg', '.jpeg'] }
 * @param minSize - Minimum file size in bytes.
 * @param maxSize - Maximum file size in bytes.
 * @param maxFiles - Maximum number of files that could be uploaded.
 * @param disabled - Disables the ability to upload files.
 * @param children - Children components that will be rendered inside the DropZone component. Could be DropArea, DropedFilesDashboard and DropZoneFooter components or othet jsx.
 * @param onDrop - Callback that is called when files are dropped.
 * @param onDropAccepted - Callback that is called when files are accepted.
 * @param onDropRejected - Callback that is called when files are rejected.
 * @param onError - Callback that is called when an error occurs.
 * @param validator - Function that validates the file before uploading.
 * @param onSubmitted - Callback that is called when files are submited and ready for upload.
 * @param onCanceled - Callback that is called when the upload process is canceled. If it’s not provided, remove all selected files.
 * @example
 * return (
 *  <DropZone onSubmitted={(files) => console.log(files)}>
 *      <DropArea>
 *          <h1>Drop files here</h1>
 *      </DropArea>
 *      <DropedFilesDashboard />
 *      <DropZoneFooter submitButtonTitle="Submit" cancelButtonTitle="Cancel" />
 *  </DropZone>
 * )
 */

export const DropZone = ({
    accept,
    minSize,
    maxSize,
    maxFiles,
    disabled,
    children,
    files: filesFromProps,
    errorMessages: errorMessagesFromProps,
    onDrop,
    onRemove,
    onDropAccepted,
    onDropRejected,
    onError,
    validator,
    onSubmitted,
    onCanceled,
}: DropZoneProps) => {
    const { errorMessages, uploadedFiles, getRootProps, getInputProps, handleDeleteFile, handleDeleteAllFiles } =
        useUploadFiles({
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
        });

    return (
        <DropZoneContextProvider
            files={uploadedFiles}
            disabled={disabled}
            errorMessages={errorMessages}
            getInputProps={getInputProps}
            getRootProps={getRootProps}
            onDeleteFile={handleDeleteFile}
            onSubmitted={onSubmitted}
            onCanceled={handleDeleteAllFiles}
        >
            <div className="space-y-4">{children}</div>
        </DropZoneContextProvider>
    );
};
