import { Schema } from 'effect';
import { CellSchema } from './cell.js';

export const RowSchema = Schema.Struct({
    type: Schema.Literal('TABLE_ROW'),
    cells: Schema.Record({ key: Schema.String, value: CellSchema }),
    identifiers: Schema.Record({ key: Schema.String, value: Schema.Union(Schema.String, Schema.Number) }),
});

export type Row = Schema.Schema.Type<typeof RowSchema>;
