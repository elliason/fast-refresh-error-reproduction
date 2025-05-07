import { Schema } from 'effect';

export const PaginationRequestSchema = Schema.Struct({
    placement: Schema.Literal('QUERY', 'BODY'),
    pageParamName: Schema.String,
    sizeParamName: Schema.String,
    beforeCursor: Schema.String,
    afterCursor: Schema.String,
});

export type PaginationRequest = Schema.Schema.Type<typeof PaginationRequestSchema>;
