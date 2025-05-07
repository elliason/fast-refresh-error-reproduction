import { Schema } from 'effect';

export const SortingRequestSchema = Schema.Struct({
    placement: Schema.Literal('QUERY', 'BODY'),
    sortParamName: Schema.String,
    directionParamName: Schema.String,
});
export type SortingRequest = Schema.Schema.Type<typeof SortingRequestSchema>;
