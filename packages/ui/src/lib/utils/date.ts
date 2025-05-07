export function canBeValidDate(value: string | number | Date): boolean {
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
}
