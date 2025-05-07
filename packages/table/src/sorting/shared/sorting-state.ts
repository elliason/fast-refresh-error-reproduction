export const SORT_DIRECTIONS = {
    ASC: 'ASC',
    DESC: 'DESC',
} as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export const sortDirections = ['ASC', 'DESC'] as const satisfies readonly SortDirection[];

export interface SortingState {
    columnName: string;
    columnOrder: SortDirection | null;
}
