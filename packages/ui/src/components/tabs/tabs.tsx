import * as React from 'react';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const Tabs = TabsPrimitive.Root;

/** TabsList Variants */
const tabsListVariants = cva(
    'text-active/90 inline-flex items-center justify-center w-full flex [&>*]:sm:flex-1 flex-wrap',
    {
        variants: {
            variant: {
                default: 'bg-active/5 rounded-md p-1',
                clean: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants> & {
        'data-testid'?: string;
    };

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
    ({ className, variant, 'data-testid': dataTestId = 'tab-list', ...props }, ref) => (
        <TabsPrimitive.List
            ref={ref}
            className={cn(tabsListVariants({ variant }), className)}
            data-testid={dataTestId}
        />
    )
);

TabsList.displayName = 'TabsList';

/** TabsTrigger Variants */
const tabsTriggerVariants = cva(
    'ring-offset-background focus-visible:ring-ring  data-[state=active]:text-foreground data-[state=active]:font-semibold w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap px-3 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
    {
        variants: {
            variant: {
                default: 'rounded-sm data-[state=active]:shadow-md data-[state=active]:bg-card',
                underline:
                    'border-b-4 border-transparent data-[state=active]:border-current data-[state=active]:font-bold',
            },
            size: {
                sm: 'px-2 py-1.5 text-sm',
                default: 'px-3 py-2 text-base',
                lg: 'px-4 py-3 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

type TabsTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants> & {
        'data-testid'?: string;
    };

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsTriggerProps>(
    ({ className, children, variant, size, 'data-testid': dataTestId = 'tab-trigger', ...props }, ref) => (
        <TabsPrimitive.Trigger
            ref={ref}
            className={cn(tabsTriggerVariants({ variant, size }), className)}
            data-testid={dataTestId}
            {...props}
        >
            {children}
        </TabsPrimitive.Trigger>
    )
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = ({
    ref,
    className,
    'data-testid': dataTestId = 'tab-content',
    ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Content> & { 'data-testid'?: string }) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            className
        )}
        data-testid={dataTestId}
        {...props}
    />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
