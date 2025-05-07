import { Schema } from "effect";
import { DataSchemaCommon } from "@project/table/shared/lib/data";
import { RowSchema } from "./row.js";
import {
  CountableOffsetPagingStatsDTOSchema,
  OffsetPagingStatsDTOSchema,
} from "@project/table/pagination/shared/offset-pagination-schema";

export const GridTableDataSchema = DataSchemaCommon(RowSchema, CountableOffsetPagingStatsDTOSchema);
export type GridTableDataType = Schema.Schema.Type<typeof GridTableDataSchema>;

export const GridTableDataWithCountableOffsetPagingSchema = DataSchemaCommon(
  RowSchema,
  CountableOffsetPagingStatsDTOSchema
);
export type GridTableDataTypeWithCountableOffsetPaging = Schema.Schema.Type<
  typeof GridTableDataWithCountableOffsetPagingSchema
>;

export const GridTableDataSchemaWithOffsetPaging = DataSchemaCommon(RowSchema, OffsetPagingStatsDTOSchema);
export type GridTableDataTypeWithOffsetPaging = Schema.Schema.Type<typeof GridTableDataSchemaWithOffsetPaging>;
