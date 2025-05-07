import { Schema } from 'effect';

export const PagingInfoSchema = Schema.Struct({
    hasPreviousPage: Schema.NullOr(Schema.Boolean),
    hasNextPage: Schema.NullOr(Schema.Boolean),
    totalItems: Schema.NullOr(Schema.Number),
    totalPages: Schema.NullOr(Schema.Number),
    currentPage: Schema.NullOr(Schema.Number),
    currentPageSize: Schema.NullOr(Schema.Number),
});
export type PagingInfo = Schema.Schema.Type<typeof PagingInfoSchema>;
