import * as React from 'react';
import { cn } from '#lib/utils';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> }) => {
    const { className, ...rest } = props;
    return (
        <input
            className={cn(
                'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid=true]:border-destructive bg-input-background flex h-10 w-full rounded-md border px-3 py-2 text-base shadow-inner file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            data-testid="input"
            {...rest}
        />
    );
};
