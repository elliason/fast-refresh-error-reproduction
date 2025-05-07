import { Schema } from 'effect';
import { TextContentSchema } from './text-content.js';
import { IconContentSchema } from './icon-content.js';
import { InlineCollectionContentSchema, type InlineCollectionContentInterface } from './inline-collection-content.js';
import { InlineListContentSchema } from './inline-list-content.js';
import { ListContentSchema } from './list-content.js';
import { ButtonContentSchema } from './button-content.js';
import { LinkContentSchema } from './link-content.js';
import type { InlineListContentInterface } from './inline-list-content.js';
import type { ListContentInterface } from './list-content.js';
import type { ButtonContentInterface } from './button-content.js';
import type { LinkContentInterface } from './link-content.js';

export const ContentSchema = Schema.Union(
    TextContentSchema,
    IconContentSchema,
    Schema.suspend((): Schema.Schema<InlineCollectionContentInterface> => InlineCollectionContentSchema),
    Schema.suspend((): Schema.Schema<InlineListContentInterface> => InlineListContentSchema),
    Schema.suspend((): Schema.Schema<ListContentInterface> => ListContentSchema),
    Schema.suspend((): Schema.Schema<ButtonContentInterface> => ButtonContentSchema),
    Schema.suspend((): Schema.Schema<LinkContentInterface> => LinkContentSchema)
);

export type Content = Schema.Schema.Type<typeof ContentSchema>;
