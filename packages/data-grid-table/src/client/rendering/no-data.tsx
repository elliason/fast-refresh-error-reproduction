import { CloudOffIcon } from 'lucide-react';

interface NoDataProps {
    title?: string;
    description?: string;
}

export const NoData = ({ title, description }: NoDataProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <CloudOffIcon className="h-10 w-10" />
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
        </div>
    );
};
