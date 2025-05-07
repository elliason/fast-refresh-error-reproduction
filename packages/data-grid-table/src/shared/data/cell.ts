import { Schema } from 'effect';
import { ContentSchema } from './content.js';

export const CellSchema = Schema.Struct({
    type: Schema.Literal('CELL'),
    content: Schema.NullOr(Schema.Union(ContentSchema, Schema.String)),
});
export type Cell = Schema.Schema.Type<typeof CellSchema>;
