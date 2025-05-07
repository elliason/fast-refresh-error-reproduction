import { Schema } from 'effect';
import { ContentSchema } from './content.js';
import type { Content } from './content.js';
import { RouteActionSchema, LinkActionSchema, BackendActionSchema } from './actions.js';
import type { RouteAction, LinkAction, BackendAction } from './actions.js';

export const LinkContentSchema = Schema.Struct({
    content: Schema.suspend((): Schema.Schema<Content> => ContentSchema),
    action: Schema.Union(RouteActionSchema, LinkActionSchema, BackendActionSchema),
    type: Schema.Literal('LINK'),
});
export const isLinkContent = Schema.is(LinkContentSchema);
export type LinkContent = Schema.Schema.Type<typeof LinkContentSchema>;

export interface LinkContentInterface {
    type: 'LINK';
    content: Readonly<Content>;
    action: RouteAction | LinkAction | BackendAction;
}
