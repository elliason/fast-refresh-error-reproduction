import { Schema } from "effect";
import { AbstractPagingStatsDTOSchema } from "./abstract-pagination-schema.js";

/**
 * @description Cursor identifying first and last item on the page
 */
export const PagingCursorSchema = Schema.Struct({
  firstItem: Schema.String,
  lastItem: Schema.String,
});
export type PagingCursor = Schema.Schema.Type<typeof PagingCursorSchema>;

/** @description General statistics for paging purposes */
export const CursorPagingStatsDTOSchema = Schema.extend(
  AbstractPagingStatsDTOSchema.omit("type"),
  Schema.Struct({
    cursors: Schema.NullOr(PagingCursorSchema),
    type: Schema.Literal("CURSOR"),
  })
);
export type CursorPagingStatsDTO = Schema.Schema.Type<typeof CursorPagingStatsDTOSchema>;

export const CursorRequestParamsSchema = Schema.Struct({
  pageAfterCursor: Schema.NullOr(Schema.String),
  pageBeforeCursor: Schema.NullOr(Schema.String),
  pageSize: Schema.Number,
});
export type CursorRequestParams = Schema.Schema.Type<typeof CursorRequestParamsSchema>;
