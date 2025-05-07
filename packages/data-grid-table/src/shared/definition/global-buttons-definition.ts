import { FiltersRequestSchema } from "@project/table/filtering/shared/filters-request";
import { PaginationRequestSchema } from "@project/table/pagination/shared/pagination-request";
import { SortingRequestSchema } from "@project/table/sorting/shared/sorting-request";
import { Schema } from "effect";

export const SendSelectedRowsSchema = Schema.Struct({
  rowIdentifierKey: Schema.String,
  placement: Schema.Literal("QUERY", "BODY"),
  parameterName: Schema.String,
});

export const BackendGlobalActionDTOSchema = Schema.Struct({
  sendFilters: Schema.NullOr(FiltersRequestSchema),
  sendSort: Schema.NullOr(SortingRequestSchema),
  sendPage: Schema.NullOr(PaginationRequestSchema),
  sendSelectedRows: Schema.NullOr(SendSelectedRowsSchema),
  method: Schema.Literal("GET", "POST", "PUT", "PATCH", "DELETE"),
  url: Schema.String,
  type: Schema.Literal("BACKEND_GLOBAL_ACTION"),
});

export const LinkGlobalActionDTOSchema = Schema.Struct({
  sendFilters: Schema.NullOr(FiltersRequestSchema),
  sendSort: Schema.NullOr(SortingRequestSchema),
  sendPage: Schema.NullOr(PaginationRequestSchema),
  sendSelectedRows: Schema.NullOr(SendSelectedRowsSchema),
  url: Schema.String,
  type: Schema.Literal("LINK_GLOBAL_ACTION"),
});

export const GlobalButtonSchema = Schema.Struct({
  label: Schema.String,
  icon: Schema.NullOr(Schema.String),
  action: Schema.Union(LinkGlobalActionDTOSchema, BackendGlobalActionDTOSchema),
});
