import { Schema } from "effect";
import { AbstractPagingStatsDTOSchema } from "./abstract-pagination-schema.js";

export const OffsetPagingSchema = Schema.Struct({
  page: Schema.Number,
  pageSize: Schema.Number,
});
export type OffsetPaging = Schema.Schema.Type<typeof OffsetPagingSchema>;

/**
 * CountableOffsetPagingStatsDTO
 *
 * @description Full paging statistics with total page and item count
 */
export const CountableOffsetPagingStatsDTOSchema = Schema.extend(
  AbstractPagingStatsDTOSchema.omit("type"),
  Schema.Struct({
    currentPage: Schema.NullOr(Schema.Number),
    totalItems: Schema.NullOr(Schema.Number),
    totalPages: Schema.NullOr(Schema.Number),
    type: Schema.Literal("COUNTABLE_OFFSET"),
  })
);
export type CountableOffsetPagingStatsDTO = Schema.Schema.Type<typeof CountableOffsetPagingStatsDTOSchema>;

/**
 * Offset without total items count
 *
 * @description General statistics for paging purposes
 */
export const OffsetPagingStatsDTOSchema = Schema.extend(
  AbstractPagingStatsDTOSchema.omit("type"),
  Schema.Struct({
    currentPage: Schema.NullOr(Schema.Number),
    type: Schema.Literal("OFFSET"),
  })
);
export type OffsetPagingStatsDTO = Schema.Schema.Type<typeof OffsetPagingStatsDTOSchema>;
