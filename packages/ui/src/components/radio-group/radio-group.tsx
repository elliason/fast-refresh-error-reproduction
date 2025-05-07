'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { createContext } from '#lib/react';
import { cn } from '#lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Circle } from 'lucide-react';

// helpers to force consistent variants across all sub-components
// declare possible variant values
const radioConfigurableVariants = {
    spacing: ['none', 'sm'],
    variant: ['default', 'chips'],
} as const;
// and derive types from it, that will be used to check
type RadioVariantKeys = keyof typeof radioConfigurableVariants;
type RadioVariantConfig = {
    [K in RadioVariantKeys]: {
        [Value in (typeof radioConfigurableVariants)[K][number]]: string;
    };
};

const [RadioGroupVariantsProvider, useRadioGroupVariantsContext] = createContext<
    VariantProps<typeof radioGroupCommonVariants>
>('RadioGroup', undefined);

/**
 * -----------------------------------------------------------------------------------------------
 * RadioGroup
 * This is a container for all radio buttons in a group
 * -----------------------------------------------------------------------------------------------
 */
const radioGroupCommonVariants = cva('radio-group', {
    variants: {
        variant: {
            default: 'inline-flex flex-col gap-2 items-start',
            chips: 'flex flex-wrap gap-2 space-y-0',
        },
        spacing: {
            none: '',
            sm: '',
        },
    } satisfies RadioVariantConfig,
});

export const RadioGroup = ({
    ref,
    className,
    spacing = 'sm',
    variant = 'default',
    ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> & VariantProps<typeof radioGroupCommonVariants>) => {
    return (
        <RadioGroupVariantsProvider variant={variant} spacing={spacing}>
            <RadioGroupPrimitive.Root
                className={cn(radioGroupCommonVariants({ spacing, variant }), className)}
                {...props}
                ref={ref}
            />
        </RadioGroupVariantsProvider>
    );
};

/**
 * -----------------------------------------------------------------------------------------------
 * RadioGroupItem
 * this is the wrapper for a label and a radio button itself
 * -----------------------------------------------------------------------------------------------
 */
const radioItemVariants = cva(
    'radio-group-item group relative m-0 inline-flex items-center justify-start border border-input group-data-[invalid=true]:border-destructive gap-1.5 space-x-0 space-y-0 rounded-full bg-input-background h-10 p-1 pe-4 ps-2 transition has-[button:disabled]:opacity-50',
    {
        variants: {
            variant: {
                default: '',
                chips: '',
            },
            spacing: {
                none: '',
                sm: 'space-x-0',
            },
        } satisfies RadioVariantConfig,
        compoundVariants: [
            {
                spacing: 'none',
                class: 'space-x-0',
            },
            {
                spacing: 'sm',
                class: 'space-x-0',
            },
        ],
    }
);

const [RadioItemProvider, useRagioItemContext] = createContext<{ id: string } | null>('RadioItem', null);

export const RadioItem = ({
    ref,
    className,
    children,
    variant: variantProp,
    spacing: spacingProp,
    ...props
}: React.ComponentPropsWithRef<'div'> & VariantProps<typeof radioItemVariants>) => {
    const radioItemID = React.useId();
    const radioGroupVariantsContext = useRadioGroupVariantsContext('RadioItem');
    const variant = variantProp || radioGroupVariantsContext.variant;
    const spacing = spacingProp || radioGroupVariantsContext.spacing;

    return (
        <RadioItemProvider id={props.id || radioItemID}>
            <div ref={ref} className={cn(radioItemVariants({ spacing, variant }), className)} {...props}>
                {children}
            </div>
        </RadioItemProvider>
    );
};

/**
 * -----------------------------------------------------------------------------------------------
 * RadioLabel
 * a label tied to a radio button
 * -----------------------------------------------------------------------------------------------
 */

const radioLabelVariants = cva(
    'radio-label cursor-pointer after:absolute after:inset-0 group-has-[button:disabled]:cursor-auto',
    {
        variants: {
            variant: {
                default: '',
                chips: '',
            },
        } satisfies Partial<RadioVariantConfig>,
    }
);

export const RadioLabel = ({
    ref,
    className,
    htmlFor: htmlForProp,
    variant: variantProp,
    ...props
}: React.ComponentPropsWithRef<'label'> & VariantProps<typeof radioLabelVariants>) => {
    const radioGroupVariantsContext = useRadioGroupVariantsContext('RadioLabel');
    const radioItemContext = useRagioItemContext('RadioLabel');
    const htmlFor = htmlForProp || radioItemContext?.id;
    const variant = variantProp || radioGroupVariantsContext.variant;
    return (
        <label
            htmlFor={htmlFor}
            ref={ref}
            className={cn(radioLabelVariants({ variant }), 'text-sm', className)}
            {...props}
        />
    );
};

/**
 * -----------------------------------------------------------------------------------------------
 * Radio Button
 * -----------------------------------------------------------------------------------------------
 */

const radioButtonVariants = cva(
    'radio-button text-white size-5 shrink-0 bg-white group-hover:bg-active/5 grow-0 group-has-[button:disabled]:!border-input group-has-[button:disabled]:bg-white border-input transition group-hover:border-active data-[state=checked]:border-active ring-offset-background focus-visible:ring-ring aspect-square rounded-full border data-[state=checked]:!bg-active focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ',
    {
        variants: {
            variant: {
                default: '',
                chips: '',
            },
        } satisfies Partial<RadioVariantConfig>,
    }
);

export const RadioButton = ({
    ref,
    className,
    id: idProp,
    variant: variantProp,
    ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioButtonVariants>) => {
    const radioGroupVariantsContext = useRadioGroupVariantsContext('Radio');
    const radioItemContext = useRagioItemContext('RadioButton');
    const id = idProp || radioItemContext?.id;
    const variant = variantProp || radioGroupVariantsContext.variant;
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            id={id}
            className={cn(radioButtonVariants({ variant }), className)}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-2 w-2 fill-current text-current" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
};
