import * as React from 'react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

const alertVariants = cva(
    'relative w-full rounded-lg border py-5 px-5 [&>svg~*]:pl-7 [&>svg+h5]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-1/2 [&>svg]:-translate-y-2/4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'text-foreground',
                info: 'bg-secondary/5 border-secondary/30 dark:border-secondary [&>svg]:text-secondary text-secondary-foreground',
                success: 'bg-success/5 border-success/30 dark:border-success [&>svg]:text-success text-success',
                warning:
                    'bg-warning/5 border-warning/30 dark:border-warning [&>svg]:text-warning text-warning-foreground',
                destructive:
                    'bg-destructive/5 border-destructive/30 dark:border-destructive [&>svg]:text-destructive text-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const Alert = ({
    ref,
    className,
    variant,
    'data-testid': dataTestId = 'alert',
    children,
    ...props
}: React.ComponentPropsWithRef<'div'> & VariantProps<typeof alertVariants> & { 'data-testid'?: string }) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        data-testid={dataTestId}
        {...props}
    >
        <AlertIcon variant={variant} />
        <div className="space-y-1">{children}</div>
    </div>
);

const AlertIcon = ({ ref, ...props }: React.SVGProps<SVGSVGElement> & VariantProps<typeof alertVariants>) => {
    if (props.variant === 'info') {
        return <Info strokeWidth={1.5} />;
    }
    if (props.variant === 'warning') {
        return <AlertTriangle strokeWidth={1.5} />;
    }
    if (props.variant === 'destructive') {
        return <XCircle strokeWidth={1.5} />;
    }
    if (props.variant === 'success') {
        return <CheckCircle strokeWidth={1.5} />;
    }
    return null;
};

const AlertTitle = ({
    ref,
    className,
    'data-testid': dataTestId = 'alertTitle',
    children,
    ...props
}: React.ComponentPropsWithRef<'h5'> & { 'data-testid'?: string }) => (
    <h5
        ref={ref}
        className={cn('text-base font-medium leading-5 tracking-tight', className)}
        data-testid={dataTestId}
        {...props}
    >
        {children}
    </h5>
);

const AlertDescription = ({
    ref,
    className,
    'data-testid': dataTestId = 'alertDescription',
    ...props
}: React.ComponentPropsWithRef<'p'> & { 'data-testid'?: string }) => (
    <p ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} data-testid={dataTestId} {...props} />
);

export { Alert, AlertTitle, AlertDescription };
