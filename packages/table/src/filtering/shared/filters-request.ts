import { Schema } from 'effect';

export const FiltersRequestSchema = Schema.Struct({
    placement: Schema.Literal('QUERY', 'BODY'),
    parameterNamePrefix: Schema.String,
});
export type FiltersRequest = Schema.Schema.Type<typeof FiltersRequestSchema>;
