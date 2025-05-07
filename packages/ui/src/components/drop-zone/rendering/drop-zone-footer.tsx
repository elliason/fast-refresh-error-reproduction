import React from 'react';
import { Button } from '#components/button';
import { CloudUpload } from 'lucide-react';
import { useDropZoneContext } from '../utils/drop-zone-context.js';

type DropZoneFooterProps = React.ComponentPropsWithoutRef<'div'> & {
    submitButtonTitle: string;
    cancelButtonTitle: string;
};

/**
 * Drop Zone Footer. Have to be used inside Drop Zone component.
 * @description Component that hendles submit and cancel actions by clicking on buttons.Could by used as a footer for Drop Zone component. Provides submit and cancel callbacks.
 * @param submitButtonTitle - Title for the submit button.
 * @param cancelButtonTitle - Title for the cancel button.
 */
export const DropZoneFooter = ({ submitButtonTitle, cancelButtonTitle }: DropZoneFooterProps) => {
    const { files, onSubmitted, onCanceled } = useDropZoneContext('DropZoneFooter');

    if (files.length === 0 || !onSubmitted || !onCanceled) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-end gap-2 sm:flex-row">
            <Button variant="primary" className="w-full pl-5 sm:w-auto" onClick={() => onSubmitted(files)}>
                <CloudUpload className="size-6" />
                <span>{submitButtonTitle}</span>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={onCanceled}>
                {cancelButtonTitle}
            </Button>
        </div>
    );
};
