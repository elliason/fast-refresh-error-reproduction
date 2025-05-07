'use client';

import * as React from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { composeRefs } from '#lib/react';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
    ref,
    className,
    'data-testid': dataTestId = 'accordionItem',
    ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item> & { 'data-testid'?: string }) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn('border-border border-b', className)}
        data-testid={dataTestId}
        {...props}
    />
);

const AccordionTrigger = ({
    ref,
    className,
    'data-testid': dataTestId = 'accordionTrigger',
    children,
    ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> & { 'data-testid'?: string }) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'text-foreground flex flex-1 items-center justify-between py-4 text-base font-medium tracking-normal decoration-1 underline-offset-1 transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
                className
            )}
            data-testid={dataTestId}
            {...props}
        >
            {children}
            <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);

const accordionContentVariants = cva('overflow-hidden transition-[max-height]', {
    variants: {
        variant: {
            default: 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            mounted:
                'data-[state=closed]:animate-accordion-up-mounted data-[state=open]:animate-accordion-down-mounted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
type AccordionContentVariants = VariantProps<typeof accordionContentVariants>;

/**
 * "Mounted" variant is a bit of a hack to get the animation to work.
 * To explain this shenanigans:
 *
 * If a content is in "mounted" variant, there is animation "animation-fill-mode" css property set to "forward"
 * This meand that a height 0 or auto is applied to the content after animation is ended.
 *
 * The problem with this is that if content is set to be closed on mount, the height will be auto and the content will be visible.
 * To be able to support accordion default values, i.e ability to set accordion to closed/open state by setting `defaultOpen` prop,
 * we need to know the initial state of the content on mount, and if it's closed we need to set the height to 0 manually.
 *
 * This manual height setting has to be reseted when the user for the first time interacts with the UI.
 * We detect the first interaction by observing the `data-state` attribute.
 *
 * After the first interaction we reset the `data-[state=closed]:h-0` and from now on, the height is determined by css animation
 */
const AccordionContent = ({
    ref,
    className,
    'data-testid': dataTestId = 'accordionContent',
    children,
    variant,
    ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Content> & {
    'data-testid'?: string;
} & AccordionContentVariants) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isInInitialState, setIsInInitialState] = React.useState(true);
    const [initialCollapsedState, setInitialCollapsedState] = React.useState<'closed' | 'open' | null>(null);

    React.useEffect(() => {
        // only run this effect if the variant is mounted
        if (variant !== 'mounted') return;

        // find out if the content is open or closed on mount
        if (contentRef.current) {
            const isClosed = contentRef.current.getAttribute('data-state') === 'closed';
            const isOpen = contentRef.current.getAttribute('data-state') === 'open';
            if (isClosed) {
                setInitialCollapsedState('closed');
            }
            if (isOpen) {
                setInitialCollapsedState('open');
            }
        }

        // register a mutation observer to detect when the content is closed or open
        if (contentRef.current) {
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes') {
                        setIsInInitialState(false);
                    }
                }
            });

            observer.observe(contentRef.current, {
                attributes: true,
                attributeFilter: ['data-state'],
            });
        }
    }, []);

    return (
        <AccordionPrimitive.Content
            ref={composeRefs(ref, contentRef)}
            forceMount={variant === 'mounted' || undefined}
            className={cn(
                accordionContentVariants({ variant }),
                {
                    // viz. above explanation
                    ['data-[state=closed]:h-0']:
                        isInInitialState && variant === 'mounted' && initialCollapsedState === 'closed',
                },
                className
            )}
            data-testid={dataTestId}
            {...props}
        >
            <div className={cn('pb-6 pt-0', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
