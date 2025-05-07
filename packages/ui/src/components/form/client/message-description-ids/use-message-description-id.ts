import * as React from 'react';

export type MessageIdsMap = { [fieldName: string]: Set<string> };

export const useMessageDescriptionId = () => {
    const [messageIdsMap, setMessageIdsMap] = React.useState<MessageIdsMap>({}); // messageIds per field

    const handleFieldMessageIdAdd = React.useCallback((fieldName: string, id: string) => {
        setMessageIdsMap((prevMessageIdsMap) => {
            const fieldDescriptionIds = new Set(prevMessageIdsMap[fieldName]).add(id);
            return { ...prevMessageIdsMap, [fieldName]: fieldDescriptionIds };
        });
    }, []);

    const handleFieldMessageIdRemove = React.useCallback((fieldName: string, id: string) => {
        setMessageIdsMap((prevMessageIdsMap) => {
            const fieldDescriptionIds = new Set(prevMessageIdsMap[fieldName]);
            fieldDescriptionIds.delete(id);
            return { ...prevMessageIdsMap, [fieldName]: fieldDescriptionIds };
        });
    }, []);

    const getFieldDescription = React.useCallback(
        (fieldName: string) => Array.from(messageIdsMap[fieldName] ?? []).join(' ') || undefined,
        [messageIdsMap]
    );

    return {
        handleFieldMessageIdAdd,
        handleFieldMessageIdRemove,
        getFieldDescription,
    };
};
