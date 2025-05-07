import { Schema } from "effect";
import type { CursorPagingStatsDTO } from "./cursor-pagination-schema.js";
import type { CountableOffsetPagingStatsDTO, OffsetPagingStatsDTO } from "./offset-pagination-schema.js";
import type { Pagination } from "./pagination-schema.js";

export const ListDataSchema = <ListItem, PaginationType extends Pagination>(
  itemSchema: Schema.Schema<ListItem, any, never>,
  paginationSchema: Schema.Schema<PaginationType, any, never>
) => {
  return Schema.Struct({
    paging: paginationSchema,
    items: Schema.Array(itemSchema),
    type: Schema.String,
  });
};

export type ListData<ListItem, PaginationType extends Pagination> = {
  paging: PaginationType;
  /** @description Sorted list of rows in the data page. */
  items: readonly ListItem[];
  type: string;
};

export type CountableOffsetListData<ListItem> = ListData<ListItem, CountableOffsetPagingStatsDTO>;

export type CursorListData<ListItem> = ListData<ListItem, CursorPagingStatsDTO>;

export type OffsetListData<ListItem> = ListData<ListItem, OffsetPagingStatsDTO>;
