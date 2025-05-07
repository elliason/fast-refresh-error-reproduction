import { Schema } from 'effect';

export const IconContentSchema = Schema.Struct({
    icon: Schema.NullOr(Schema.String),
    type: Schema.Literal('ICON'),
});
export const isIconContent = Schema.is(IconContentSchema);
export type IconContent = Schema.Schema.Type<typeof IconContentSchema>;
