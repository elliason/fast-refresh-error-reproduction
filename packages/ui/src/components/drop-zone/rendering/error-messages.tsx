import { Alert, AlertDescription, AlertTitle } from '#components/alert';
import { useDropZoneContext } from '../utils/drop-zone-context.js';

/**
 * @description Error Messages. Component that represents a list of error messages what comes from the file validation process.
 * @returns
 */
export const ErrorMessages: React.FC = () => {
    const { errorMessages } = useDropZoneContext('ErrorMessages');

    if (errorMessages.length === 0) {
        return null;
    }

    return (
        <div data-testid="drop-zone-error-message">
            <Alert variant="destructive">
                <AlertTitle>File upload error</AlertTitle>
                {errorMessages.map((error, index) => (
                    <AlertDescription key={index}>{error}</AlertDescription>
                ))}
            </Alert>
        </div>
    );
};
