import { Schema } from 'effect';

export const PaginationStateSchema = Schema.Struct({
    pageIndex: Schema.Number,
    pageSize: Schema.Number,
});
export type PaginationState = Schema.Schema.Type<typeof PaginationStateSchema>;

export type SetPaginationState = (pagination: PaginationState) => void;
