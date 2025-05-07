import { Schema } from 'effect';

export const SortingDefinitionSchema = Schema.Struct({
    defaultSort: Schema.NullOr(
        Schema.Struct({
            name: Schema.String,
            direction: Schema.NullOr(Schema.Literal('ASC', 'DESC')),
        })
    ),

    sortOptions: Schema.Array(
        Schema.Struct({
            name: Schema.String,
            label: Schema.String,
        })
    ),
});

export type SortingDefinition = Schema.Schema.Type<typeof SortingDefinitionSchema>;
