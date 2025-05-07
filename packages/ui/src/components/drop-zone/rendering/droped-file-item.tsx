import { Button } from '#components/button';
import { Muted } from '#components/text';
import { Paperclip, Trash2 } from 'lucide-react';

interface DropedFilesItemProps {
    file: File;
    index: number;
    screenReaderDeleteText?: string;
    handleDeleteFile: (index: number) => void;
}

/**
 *
 * @description Droped Files Item. Component that represents a file that was dropped in the Drop Zone. Provides a file name, size and delete button.
 * @param file - File object that was dropped.
 * @param index - Index of the file in the list of dropped files.
 * @param screenReaderDeleteText - Text that will be read by the screen reader.
 * @param handleDeleteFile - Callback function that deletes the file from the list of dropped files.
 */
export const DropedFilesItem: React.FC<DropedFilesItemProps> = ({
    file,
    index,
    screenReaderDeleteText = 'Delete',
    handleDeleteFile,
}) => {
    const convertBTokB = (bytes: number): number => {
        return Math.round((bytes / 1024) * 100) / 100;
    };

    return (
        <li className="flex w-full items-center gap-2">
            <div className="flex flex-1 items-center sm:w-0">
                <Paperclip className="hidden h-5 w-5 flex-shrink-0 text-gray-400 sm:block" aria-hidden="true" />
                <span className="ml-2 truncate font-medium">{file.name}</span>
            </div>
            <div className="ml-9 flex flex-shrink-0 items-center">
                <Muted className="mr-4 flex-shrink-0">{convertBTokB(file.size)} kB</Muted>
                <Button
                    data-testid="droped-file-item-delete"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive p-0 hover:bg-transparent"
                    onClick={() => handleDeleteFile(index)}
                >
                    <Trash2 className="size-5 mr-2" />
                    <span className="sr-only">{screenReaderDeleteText}</span>
                </Button>
            </div>
        </li>
    );
};
