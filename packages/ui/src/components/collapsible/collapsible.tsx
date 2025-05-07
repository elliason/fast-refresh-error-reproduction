'use client';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

const Collapsible = ({
    'data-testid': dataTestId = 'collapsible',
    ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Root> & { 'data-testid'?: string }) => {
    return <CollapsiblePrimitive.Root data-testid={dataTestId} {...props} />;
};

const CollapsibleTrigger = ({
    'data-testid': dataTestId = 'collapsible-trigger',
    ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & { 'data-testid'?: string }) => {
    return <CollapsiblePrimitive.CollapsibleTrigger data-testid={dataTestId} {...props} />;
};

const CollapsibleContent = ({
    'data-testid': dataTestId = 'collapsible-content',
    ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleContent> & { 'data-testid'?: string }) => {
    return <CollapsiblePrimitive.CollapsibleContent data-testid={dataTestId} {...props} />;
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
