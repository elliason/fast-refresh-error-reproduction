import { Schema } from 'effect';
import { ContentSchema } from './content.js';
import type { Content } from './content.js';

export const ListContentSchema = Schema.Struct({
    type: Schema.Literal('LIST'),
    contents: Schema.Array(Schema.suspend((): Schema.Schema<Content> => ContentSchema)),
});
export const isListContent = Schema.is(ListContentSchema);
export type ListContent = Schema.Schema.Type<typeof ListContentSchema>;

export interface ListContentInterface {
    type: 'LIST';
    contents: Readonly<Array<Content>>;
}
