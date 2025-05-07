import { Schema } from 'effect';
import { GlobalButtonSchema } from './global-buttons-definition.js';

export const ColumnDefinitionSchema = Schema.Struct({
    name: Schema.String,
    label: Schema.String,
    sortable: Schema.NullOr(Schema.Boolean),
});
export type ColumnDefinition = Schema.Schema.Type<typeof ColumnDefinitionSchema>;

export const TableRenderingDefinitionSchema = Schema.Struct({
    type: Schema.Literal('TABLE'),
    globalButtons: Schema.Array(GlobalButtonSchema),
    columns: Schema.Array(ColumnDefinitionSchema),
    identifiers: Schema.Array(Schema.String),
});
export type TableRenderingDefinition = Schema.Schema.Type<typeof TableRenderingDefinitionSchema>;
