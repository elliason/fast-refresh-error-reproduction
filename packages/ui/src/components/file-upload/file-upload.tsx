'use client';

import * as React from 'react';
import {
    DropArea,
    DropedFilesDashboard,
    DropZone,
    DropZoneFooter,
    ErrorMessages,
    type DropEvent,
    type FileRejection,
} from '#components/drop-zone';
import type { FileUploadDropZoneProps } from './types.js';
import { useFileUpload } from './utils/use-file-upload.js';

const FileUploadDropZone = (props: FileUploadDropZoneProps) => {
    const {
        url,
        onRemove: onRemoveFromProps,
        onUploadAccepted,
        onUploadRejected,
        onDropAccepted: onDropAcceptedFromProps,
        onDropRejected: onDropRejectedFromProps,
        validator: validatorFromProps,
        ...etc
    } = props;

    const { files, errorMessages, setErrorMessages, remove, upload } = useFileUpload(url);

    const handleRemove = React.useCallback(
        async (file: File, index: number) => {
            await remove(file, index);
            onRemoveFromProps?.(file, index);
        },
        [remove, onRemoveFromProps]
    );

    const handleDropAccepted = React.useCallback(
        async (files: File[], event: DropEvent) => {
            onDropAcceptedFromProps?.(files, event);
            const { uploads, rejections } = await upload(files);
            if (uploads?.length > 0) {
                onUploadAccepted?.(uploads);
            }
            if (rejections?.length > 0) {
                onUploadRejected?.(rejections);
            }
        },
        [upload, onDropAcceptedFromProps]
    );

    const handleDropRejected = React.useCallback(
        (rejections: FileRejection[]) => {
            onDropRejectedFromProps?.(rejections);
            setErrorMessages((prev) => [
                ...prev,
                ...rejections.map(({ errors }) => errors.map(({ message }) => message)).flat(),
            ]);
        },
        [onDropRejectedFromProps]
    );

    return (
        <DropZone
            files={files}
            errorMessages={errorMessages}
            onDropAccepted={handleDropAccepted} //upload files accpeted by dropzone
            onDropRejected={handleDropRejected}
            onRemove={handleRemove} //delete files
            {...etc}
        />
    );
};

const FileUploadDropArea = DropArea;

const FileUploadDropedFilesDashboard = DropedFilesDashboard;

const FileUploadDropZoneFooter = DropZoneFooter;

const FileUploadErrorMessages = ErrorMessages;

export {
    FileUploadDropArea,
    FileUploadDropedFilesDashboard,
    FileUploadDropZone,
    FileUploadDropZoneFooter,
    FileUploadErrorMessages,
};
