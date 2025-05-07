import { Schema } from "effect";
import { CountableOffsetPagingStatsDTOSchema, OffsetPagingStatsDTOSchema } from "./offset-pagination-schema.js";
import { CursorPagingStatsDTOSchema } from "./cursor-pagination-schema.js";

export const PaginationSchema = Schema.Union(
  CountableOffsetPagingStatsDTOSchema,
  OffsetPagingStatsDTOSchema,
  CursorPagingStatsDTOSchema
);
export type Pagination = Schema.Schema.Type<typeof PaginationSchema>;
