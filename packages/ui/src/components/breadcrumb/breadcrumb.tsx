import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

const Breadcrumb = ({
    ref,
    ...props
}: React.ComponentPropsWithRef<'nav'> & {
    separator?: React.ReactNode;
}) => <nav ref={ref} aria-label="breadcrumb" {...props} />;

const BreadcrumbList = ({ className, ref, ...props }: React.ComponentPropsWithRef<'ol'>) => (
    <ol
        ref={ref}
        className={cn(
            'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
            className
        )}
        {...props}
    />
);

const BreadcrumbItem = ({ className, ref, ...props }: React.ComponentPropsWithRef<'li'>) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
);

const BreadcrumbLink = ({
    asChild,
    className,
    ref,
    ...props
}: React.ComponentPropsWithRef<'a'> & {
    asChild?: boolean;
}) => {
    const Comp = asChild ? Slot.Root : 'a';

    return <Comp ref={ref} className={cn('hover:text-foreground transition-colors', className)} {...props} />;
};

const BreadcrumbPage = ({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn('text-foreground font-normal', className)}
        {...props}
    />
);

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
    <li role="presentation" aria-hidden="true" className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)} {...props}>
        {children ?? <ChevronRight />}
    </li>
);

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More</span>
    </span>
);

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
