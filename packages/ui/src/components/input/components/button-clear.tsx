import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export type InputClearableProps = {
    onClear: () => void;
    CustomClearButton?: ReactNode;
};

export const ButtonClear = ({ onClear, CustomClearButton }: InputClearableProps) => {
    const handleClear = () => {
        onClear();
    };
    return (
        <div
            className="absolute right-4 top-1/2 flex -translate-y-1/2 transform cursor-pointer items-center justify-center"
            onClick={handleClear}
        >
            {CustomClearButton || <X id="clear-button" type="button" className="h-5 w-5" />}
        </div>
    );
};
