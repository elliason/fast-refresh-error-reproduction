import { createContext } from '#lib/react';
import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

/**
 * Drop Zone Context
 * @description Context that gives access to the files that are ready for upload. Also provides the ability to delete files, submit files, and cancel the upload process.
 */

export interface DropZoneContextValue {
    files: File[];
    disabled?: boolean;
    errorMessages: string[];
    getRootProps?: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps?: <T extends DropzoneInputProps>(props?: T) => T;
    onDeleteFile?: (index: number) => void;
    onSubmitted?: (files: File[]) => void;
    onCanceled?: () => void;
}

const [DropZoneContextProvider, useDropZoneContext] = createContext<DropZoneContextValue>('DropZone', {
    files: [],
    disabled: false,
    errorMessages: [],
});

export { useDropZoneContext, DropZoneContextProvider };
