import type { DropZone, FileRejection } from '#components/drop-zone';

export interface UploadResponse {
    errorMessage?: string;
    id?: string;
}

export interface UploadResult {
    success: boolean;
    file: File;
    message?: string;
    id?: string;
}

export interface Upload {
    file: File;
    id?: string;
}

export interface UploadRejection extends FileRejection {}

export type FileUploadDropZoneProps = React.ComponentPropsWithoutRef<typeof DropZone> & {
    url: string;
    onUploadAccepted?: (files: Upload[]) => void;
    onUploadRejected?: (rejections: UploadRejection[]) => void;
};
