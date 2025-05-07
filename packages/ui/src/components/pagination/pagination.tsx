import * as React from 'react';
import { buttonVariants, type ButtonProps } from '#components/button';
import { cn } from '#lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav role="navigation" aria-label="Stránkování" className={cn('flex justify-center', className)} {...props} />
);

const PaginationContent = ({ ref, className, ...props }: React.ComponentPropsWithRef<'ul'>) => (
    <ul ref={ref} className={cn('flex flex-row flex-wrap items-stretch gap-1', className)} {...props} />
);

const PaginationItem = ({ ref, className, ...props }: React.ComponentPropsWithRef<'li'>) => (
    <li ref={ref} className={cn('', className)} {...props} />
);

type PaginationLinkProps = {
    isActive?: boolean;
} & Partial<Pick<ButtonProps, 'size'>> &
    React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, size = 'icon', children, ...props }: PaginationLinkProps) => (
    <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            'h-full cursor-pointer',
            buttonVariants({
                variant: 'ghost',
                size: 'sm',
            }),
            isActive
                ? 'border-active/30 size-8 cursor-auto border p-0 font-semibold hover:bg-transparent'
                : 'size-8 p-0',
            className
        )}
        {...props}
    >
        {children}
    </a>
);

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Přejít na předchozí stranu"
        size="default"
        className={cn('cursor-pointer', className)}
        {...props}
    >
        <ChevronLeft className="size-6" />
        <span className="sr-only">Předchozí</span>
    </PaginationLink>
);

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Přejít na další stranu"
        size="default"
        className={cn('cursor-pointer', className)}
        {...props}
    >
        <span className="sr-only">Další</span>
        <ChevronRight className="size-6" />
    </PaginationLink>
);

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span aria-hidden className={cn('size-8 flex items-center justify-center', className)} {...props}>
        <MoreHorizontal className="size-3 text-slate-500" />
        <span className="sr-only">More pages</span>
    </span>
);

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
