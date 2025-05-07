import { Schema } from 'effect';
import { ContentSchema } from './content.js';
import type { Content } from './content.js';

export const InlineListContentSchema = Schema.Struct({
    type: Schema.Literal('INLINE_LIST'),
    contents: Schema.Array(Schema.suspend((): Schema.Schema<Content> => ContentSchema)),
});
export const isInlineListContent = Schema.is(InlineListContentSchema);
export type InlineListContent = Schema.Schema.Type<typeof InlineListContentSchema>;

export interface InlineListContentInterface {
    type: 'INLINE_LIST';
    contents: Readonly<Array<Content>>;
}
