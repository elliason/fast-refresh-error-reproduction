import { Schema } from "effect";
import { PagingInfoSchema } from "../../pagination/shared/paging-info.js";
import {
  CountableOffsetPagingStatsDTOSchema,
  type CountableOffsetPagingStatsDTO,
  type OffsetPagingStatsDTO,
} from "../../pagination/shared/offset-pagination-schema.js";

export const DataSchemaCommon = <
  Items extends Schema.Schema<any, any, never>,
  Paging extends
    | Schema.Schema<CountableOffsetPagingStatsDTO, any, never>
    | Schema.Schema<OffsetPagingStatsDTO, any, never>
>(
  itemSchema: Items,
  pagingSchema: Paging
) =>
  Schema.Struct({
    paging: Schema.NullOr(pagingSchema),
    items: Schema.Array(itemSchema),
    type: Schema.Literal("GRID_DATA"),
  });

export type GridDataCommonType = Schema.Schema.Type<typeof DataSchemaCommon>;
