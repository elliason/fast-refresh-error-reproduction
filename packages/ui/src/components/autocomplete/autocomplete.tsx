import React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '#components/command';
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover';
import { cn } from '#lib/utils';
import { CommandInput } from 'cmdk';

const AutocompleteRoot = (
    props: React.ComponentPropsWithoutRef<typeof Popover> & {
        commandProps?: React.ComponentPropsWithRef<typeof Command>;
    }
) => {
    const { children, open, commandProps, ...etc } = props;
    return (
        <Popover open={open} {...etc}>
            <Command shouldFilter={false} {...commandProps}>
                {children}
                {!open && <CommandList></CommandList>}
                {/* empty list when closed to overcome the error undefined is not iterrable */}
            </Command>
        </Popover>
    );
};

const AutocompleteTrigger: React.ComponentType<React.ComponentPropsWithRef<typeof PopoverTrigger>> = PopoverTrigger;

const AutocompleteInput = (props: React.ComponentPropsWithRef<typeof CommandInput>) => {
    const { ref, className, ...etc } = props;
    return (
        <CommandInput
            ref={ref}
            className={cn(
                'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid=true]:border-destructive bg-input-background flex h-10 w-full rounded-md border px-3 py-2 text-base shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...etc}
        />
    );
};

const AutocompleteContent = (props: React.ComponentPropsWithRef<typeof PopoverContent>) => {
    const { className, ...etc } = props;
    return (
        <PopoverContent
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className={cn(`w-[var(--radix-popover-trigger-width)] p-0`)}
            {...etc}
        />
    );
};

const AutocompleteList = CommandList;

const AutocompleteGroup = CommandGroup;

const AutocompleteItem = CommandItem;

const AutocompleteEmpty = CommandEmpty;

export {
    AutocompleteRoot as Autocomplete,
    AutocompleteTrigger,
    AutocompleteInput,
    AutocompleteContent,
    AutocompleteGroup,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteEmpty,
    AutocompleteRoot as Root,
    AutocompleteTrigger as Trigger,
    AutocompleteInput as Input,
    AutocompleteContent as Content,
    AutocompleteList as List,
    AutocompleteItem as Item,
    AutocompleteEmpty as EmptyMessage,
};
