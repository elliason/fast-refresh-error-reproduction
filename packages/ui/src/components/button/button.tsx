import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    'button no-underline transition inline-flex gap-2 duration-300 items-center [&>svg]:text-current justify-center whitespace-nowrap text-base  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: '',
                primary:
                    '-primary px-6 py-2 bg-active text-active-foreground hover:bg-active-hover hover:text-active-foreground font-medium',
                destructive: 'px-6 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium',
                success: 'px-6 py-2 bg-success text-success-foreground hover:bg-success/90 shadow-md font-medium',
                outline: 'px-6 py-2 border border-active text-active hover:bg-active/10 hover:text-active font-medium',
                secondary:
                    '-secondary px-6 py-2 bg-secondary/40 text-secondary-foreground hover:bg-secondary/30 font-semibold',
                ghost: 'px-6 py-2 text-active hover:bg-accent hover:text-accent-foreground',
                link: 'px-6 py-2 text-active dark:text-secondary-foreground p-0 hover:text-active-hover hover:no-underline underline',
                input: 'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid=true]:border-destructive bg-input-background flex h-10 w-full rounded-md border px-3 py-2 text-base shadow-inner file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            },
            size: {
                default: '',
                sm: ' px-3 py-1 text-sm',
                lg: ' px-10 py-4 text-xl',
                icon: 'h-10 w-10 p-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    dataTestId?: string;
    asChild?: boolean;
}

const Button = ({
    ref,
    className,
    variant,
    dataTestId,
    size,
    asChild = false,
    ...props
}: React.ComponentPropsWithRef<'button'> & ButtonProps) => {
    const testId = dataTestId ?? `button-${variant}`;
    const Comp = asChild ? Slot.Root : 'button';
    return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} data-testid={testId} {...props} />
    );
};
Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
