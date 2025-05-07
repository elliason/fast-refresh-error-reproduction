'use client';

import type React from 'react';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast.js';
import { useToast } from './use-toast.js';

export function Toaster({ duration }: React.ComponentProps<typeof ToastProvider>) {
    const { toasts } = useToast();

    return (
        <ToastProvider duration={duration}>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div>
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
