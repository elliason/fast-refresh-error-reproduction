import * as React from 'react';

// TODO: implement "asChild" prop using Slot
export const Link = function Link({ ref, ...props }: React.ComponentPropsWithRef<'a'> & { 'data-testid'?: string }) {
    const { children, ...rest } = props;
    return (
        <a className="text-primary hover:text-accent-foreground underline" {...rest} data-testid='link' ref={ref}>
            {children}
        </a>
    );
};
