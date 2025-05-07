import * as React from 'react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const Table = ({ ref, className, ...props }: React.ComponentPropsWithRef<'table'>) => (
    <div className="relative w-full overflow-auto">
        <table ref={ref} className={cn('w-full caption-bottom', className)} data-testid="table" {...props} />
    </div>
);

const TableHeader = ({ ref, className, ...props }: React.ComponentPropsWithRef<'thead'>) => (
    <thead
        ref={ref}
        className={cn('[&_tr]:border-border [&_tr]:border-b', className)}
        data-testid="table-header"
        {...props}
    />
);

const TableBody = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tbody'>) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} data-testid="table-body" {...props} />
);

const TableFooter = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tfoot'>) => (
    <tfoot
        ref={ref}
        className={cn('bg-muted/50 border-border border-t font-medium [&>tr]:last:border-b-0', className)}
        data-testid="table-footer"
        {...props}
    />
);

const TableRow = ({ ref, className, ...props }: React.ComponentPropsWithRef<'tr'>) => (
    <tr
        ref={ref}
        className={cn(
            'hover:bg-muted/50 data-[state=selected]:bg-muted border-border  border-b transition-colors',
            className
        )}
        data-testid="table-row"
        {...props}
    />
);

const TableHead = ({ ref, className, ...props }: React.ComponentPropsWithRef<'th'>) => (
    <th
        ref={ref}
        className={cn(
            'text-muted-foreground h-12 break-words px-3 text-left align-middle text-xs font-normal [&:has([role=checkbox])]:pr-0',
            className
        )}
        data-testid="table-head"
        {...props}
    />
);

export const TableCellVariants = cva('', {
    variants: {
        variant: {
            default: 'break-words px-3 py-2 align-middle [&:has([role=checkbox])]:pr-0',
            pure: '',
        },
    },
});

const TableCell = ({
    ref,
    className,
    variant = 'default',
    ...props
}: React.ComponentPropsWithRef<'td'> & VariantProps<typeof TableCellVariants>) => {
    return (
        <td ref={ref} className={cn(TableCellVariants({ variant }), className)} data-testid="table-cell" {...props} />
    );
};

const TableCaption = ({ ref, className, ...props }: React.ComponentPropsWithRef<'caption'>) => (
    <caption
        ref={ref}
        className={cn('text-muted-foreground mt-4 text-sm', className)}
        data-testid="table-caption"
        {...props}
    />
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
