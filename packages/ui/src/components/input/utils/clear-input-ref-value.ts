import type { RefObject } from 'react';

export function clearInputRefValue<T extends HTMLInputElement>(ref: RefObject<T | null>) {
    if (!ref?.current) {
        return;
    }

    const element = ref.current;

    switch (element.type) {
        case 'checkbox':
        case 'radio':
            element.checked = false;
            break;
        case 'file':
            element.value = '';
            break;
        case 'number':
            element.value = '0';
            break;
        default:
            element.value = '';
            break;
    }
}
