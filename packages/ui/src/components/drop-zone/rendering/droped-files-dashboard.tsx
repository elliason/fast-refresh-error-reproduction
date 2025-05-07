import { useDropZoneContext } from '../utils/drop-zone-context.js';
import { DropedFilesItem } from './droped-file-item.js';

/**
 * Drop Zone Dashdoard. Have to be used inside Drop Zone component.
 * @description Component that shows all accepted files ready for upload. Each file could be deleted by clicking on delete button.
 * @param screenReaderDeleteText - Text that will be read by the screen reader.
 */
export const DropedFilesDashboard = ({ screenReaderDeleteText }: { screenReaderDeleteText?: string }) => {
    const { files, onDeleteFile } = useDropZoneContext('DropedFilesDashboard');

    if (files.length === 0 || !onDeleteFile) {
        return null;
    }

    return (
        <ul className="my-6 divide-y divide-dashed" data-testid="droped-files-dashboard">
            {files.map((file, index) => (
                <DropedFilesItem
                    key={index}
                    file={file}
                    index={index}
                    screenReaderDeleteText={screenReaderDeleteText}
                    handleDeleteFile={onDeleteFile}
                />
            ))}
        </ul>
    );
};
