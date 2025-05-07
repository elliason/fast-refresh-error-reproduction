import { Schema } from 'effect';

export const AbstractPagingStatsDTOSchema = Schema.Struct({
    currentPageSize: Schema.NullOr(Schema.Number),
    hasPreviousPage: Schema.NullOr(Schema.Boolean),
    hasNextPage: Schema.NullOr(Schema.Boolean),
    type: Schema.String,
});
export type AbstractPagingStatsDTO = Schema.Schema.Type<typeof AbstractPagingStatsDTOSchema>;
