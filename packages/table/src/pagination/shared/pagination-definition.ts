import { Schema } from 'effect';

export const PaginationDefinitionSchema = Schema.Struct({
    defaultSize: Schema.NullOr(Schema.Number),
    sizeOptions: Schema.Array(Schema.Number),
});
export type PaginationDefinition = Schema.Schema.Type<typeof PaginationDefinitionSchema>;
