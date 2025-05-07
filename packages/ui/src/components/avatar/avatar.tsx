'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { cn } from '#lib/utils';

const Avatar = ({
    ref,
    className,
    'data-testid': dataTestId = 'avatar',
    ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Root> & { 'data-testid'?: string }) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn('size-10 relative flex shrink-0 overflow-hidden rounded-full', className)}
        data-testid={dataTestId}
        {...props}
    />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = ({
    ref,
    className,
    'data-testid': dataTestId = 'avatarImage',
    ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Image> & { 'data-testid'?: string }) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full', className)}
        data-testid={dataTestId}
        {...props}
    />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = ({
    ref,
    className,
    'data-testid': dataTestId = 'avatarFallback',
    ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> & { 'data-testid'?: string }) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn('bg-primary/15 flex h-full w-full items-center justify-center rounded-full', className)}
        {...props}
        data-testid={dataTestId}
    />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
