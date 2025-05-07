import { Schema } from 'effect';

export const TextContentSchema = Schema.Struct({
    text: Schema.String,
    type: Schema.Literal('TEXT'),
});
export const isTextContent = Schema.is(TextContentSchema);
export type TextContent = Schema.Schema.Type<typeof TextContentSchema>;
