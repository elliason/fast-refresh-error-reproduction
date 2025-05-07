import * as React from 'react';
import { cn } from '#lib/utils';
import { useDropZoneContext } from '../utils/drop-zone-context.js';

type DropAreaProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode;
};

/**
 * Drop Area. Have to be used inside Drop Zone component.
 * @description Component that allows to upload files by dragging and dropping them into the component or selecting from files.
 * @param children - Children components that will be rendered inside the DropArea component. Could be any jsx.
 */
export const DropArea = ({ children }: DropAreaProps) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const { disabled, getInputProps, getRootProps } = useDropZoneContext('DropArea');

    const isDisabled = !disabled
        ? 'cursor-pointer hover:border-active hover:bg-active/5 transition-colors dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-bray-800'
        : 'cursor-not-allowed';

    const isDragged = isDragOver ? 'bg-gray-100 border-gray-500' : 'bg-gray-50 border-gray-300';

    if (!getRootProps || !getInputProps) {
        return null;
    }

    return (
        <div
            {...getRootProps({
                className: 'dropzone',
                onDragEnter: () => {
                    setIsDragOver(true);
                },
                onDragOver: (e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                },
                onDragLeave: () => {
                    setIsDragOver(false);
                },
                onDrop: () => {
                    setIsDragOver(false);
                },
            })}
            className={cn(
                'flex w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50  dark:border-gray-600 dark:bg-gray-700',
                isDisabled,
                isDragged
            )}
            data-testid="drop-area"
        >
            <div className=" flex flex-col items-center justify-center px-8 pb-8 pt-6 text-center">{children}</div>
            <input {...getInputProps()} data-testid="drop-area-input" />
        </div>
    );
};
