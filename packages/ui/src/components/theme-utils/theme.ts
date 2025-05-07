export const getThemeVar = (name: string) => {
    if (typeof window === 'undefined') {
        return '';
    }
    const root = window.document.documentElement;
    const value = window.getComputedStyle(root).getPropertyValue(name);
    return value;
};
