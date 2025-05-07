import type { ReactNode } from 'react';
import { Button } from '#components/button';
import { Minus, Plus } from 'lucide-react';

export type ArrayFieldActionButtonsWrapperProps = {
    onAdd: () => void;
    onRemove: () => void;
    isAddButtonVisible: boolean;
    isRemoveButtonVisible: boolean;
};
export const ArrayFieldActionButtonsWrapper = ({
    onAdd,
    onRemove,
    isAddButtonVisible,
    isRemoveButtonVisible,
}: ArrayFieldActionButtonsWrapperProps) => {
    return (
        <div className="flex flex-1 items-center gap-2">
            <div className="flex gap-2">
                {isRemoveButtonVisible && (
                    <Button
                        data-testid="removeButton"
                        type="button"
                        size="icon"
                        className="border-input text-input hover:border-input hover:text-input h-7 w-7 border hover:bg-gray-100"
                        onClick={onRemove}
                    >
                        <Minus aria-hidden="true" />
                    </Button>
                )}
                {isAddButtonVisible && (
                    <Button
                        data-testid="addButton"
                        type="button"
                        size="icon"
                        className="border-input text-input hover:border-input hover:text-input h-7 w-7 border hover:bg-gray-100"
                        onMouseDown={onAdd}
                    >
                        <Plus aria-hidden="true" />
                    </Button>
                )}
            </div>
        </div>
    );
};
