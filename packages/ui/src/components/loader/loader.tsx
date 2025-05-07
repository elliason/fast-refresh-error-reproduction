import * as React from 'react';
import { cn } from '#lib/utils';

export const Loader = ({ ref, className, ...props }: React.ComponentPropsWithRef<'div'>) => (
    <div ref={ref} className={cn(className)} {...props}></div>
);
