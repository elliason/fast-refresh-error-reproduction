import { Schema } from 'effect';
import { ContentSchema } from './content.js';
import type { Content } from './content.js';
import { RouteActionSchema, LinkActionSchema, BackendActionSchema } from './actions.js';
import type { RouteAction, LinkAction, BackendAction } from './actions.js';

export const ButtonContentSchema = Schema.Struct({
    content: Schema.suspend((): Schema.Schema<Content> => ContentSchema),
    action: Schema.Union(RouteActionSchema, LinkActionSchema, BackendActionSchema),
    type: Schema.Literal('BUTTON'),
});
export const isButtonContent = Schema.is(ButtonContentSchema);
export type ButtonContent = Schema.Schema.Type<typeof ButtonContentSchema>;

// for recursive schema definition
export interface ButtonContentInterface {
    type: 'BUTTON';
    content: Readonly<Content>;
    action: RouteAction | LinkAction | BackendAction;
}
