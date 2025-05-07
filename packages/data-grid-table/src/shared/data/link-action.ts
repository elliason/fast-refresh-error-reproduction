import { Schema } from 'effect';

export const LinkActionSchema = Schema.Struct({
    url: Schema.String,
    type: Schema.Literal('LINK_ACTION'),
});
export const isLinkAction = Schema.is(LinkActionSchema);
export type LinkAction = Schema.Schema.Type<typeof LinkActionSchema>;
