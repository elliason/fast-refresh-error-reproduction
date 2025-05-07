import { Schema } from 'effect';
import { ContentSchema, type Content } from './content.js';

export const InlineCollectionContentSchema = Schema.Struct({
    type: Schema.Literal('INLINE_COLLECTION'),
    contents: Schema.Array(Schema.suspend((): Schema.Schema<Content> => ContentSchema)),
});
export const isInlineCollectionContent = Schema.is(InlineCollectionContentSchema);
export type InlineCollectionContent = Schema.Schema.Type<typeof InlineCollectionContentSchema>;

export interface InlineCollectionContentInterface {
    type: 'INLINE_COLLECTION';
    contents: Readonly<Array<Content>>;
}
