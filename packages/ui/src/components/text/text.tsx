import { Link } from '#components/link';
import { cn } from '#lib/utils';

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
    return <p {...props} data-slot="text" className={cn(className || 'text-foreground')} />;
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
    return <Link {...props} className={cn(className, '')} />;
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
    return <strong {...props} className={cn(className || 'text-foreground font-semibold dark:text-white')} />;
}

export function Muted({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
    return <span {...props} className={cn(className || 'text-muted-foreground text-sm')} />;
}

export function EyebrowTitle({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
    return (
        <p
            {...props}
            className={cn(className || 'text-xs font-semibold uppercase leading-6 tracking-wider text-slate-500')}
        />
    );
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
    return (
        <code
            {...props}
            className={cn(
                className,
                'bg-muted text-foreground block rounded border px-3 py-1.5 text-sm dark:border-white/20 dark:bg-white/5 dark:text-white'
            )}
        />
    );
}
