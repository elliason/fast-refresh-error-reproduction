'use client';

import { createContext } from '#lib/react';

type MessageDescriptionContextValue = {
    onFieldMessageIdAdd(fieldName: string, id: string): void;
    onFieldMessageIdRemove(fieldName: string, id: string): void;
    getFieldDescription(fieldName: string): string | undefined;
};

const [DescriptionIdsProvider, useDescriptionIdsContext] =
    createContext<MessageDescriptionContextValue>('FormAriaDescriptions');

export { DescriptionIdsProvider, useDescriptionIdsContext };
