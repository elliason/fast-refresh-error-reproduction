import { type DropEvent, type FileRejection } from 'react-dropzone';
import { DropArea } from './rendering/drop-area.js';
import { DropZoneFooter } from './rendering/drop-zone-footer.js';
import { DropZone } from './rendering/drop-zone.js';
import { DropedFilesDashboard } from './rendering/droped-files-dashboard.js';
import { ErrorMessages } from './rendering/error-messages.js';
import { useUploadFiles, type DropZoneFilesError } from './utils/use-upload-file.js';

export {
    DropZone,
    DropArea,
    DropZoneFooter,
    DropedFilesDashboard,
    useUploadFiles,
    type DropEvent,
    type DropZoneFilesError,
    type FileRejection,
    ErrorMessages,
};
