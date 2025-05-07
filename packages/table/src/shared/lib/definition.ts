import { Schema } from "effect";
import { FiltersDefinitionSchema, type FiltersDefinition } from "../../filtering/shared/filters-definition.js";
import {
  PaginationDefinitionSchema,
  type PaginationDefinition,
} from "../../pagination/shared/pagination-definition.js";
import { SortingDefinitionSchema, type SortingDefinition } from "../../sorting/shared/sorting-definition.js";
import { SortingRequestSchema } from "../../sorting/shared/sorting-request.js";
import { FiltersRequestSchema } from "../../filtering/shared/filters-request.js";
import { PaginationRequestSchema } from "../../pagination/shared/pagination-request.js";
import type { FiltersRequest } from "../../filtering/shared/filters-request.js";
import type { PaginationRequest } from "../../pagination/shared/pagination-request.js";
import type { SortingRequest } from "../../sorting/shared/sorting-request.js";

type SpecificDefinitionSchemaType = Schema.Schema<any, any, never>;
export type SpecificDefinitionType = Schema.Schema.Type<SpecificDefinitionSchemaType>;

export type GridDefinition<
  SpecificDefinition extends SpecificDefinitionType = SpecificDefinitionType,
  ActualFiltersDefinition extends FiltersDefinition = FiltersDefinition,
  ActualRenderDefinition extends Record<string, unknown> = Record<string, unknown>
> = {
  dataApiUrl: string;
  paging: PaginationDefinition | null;
  sorting: SortingDefinition | null;
  filters: ActualFiltersDefinition | null;
  render: ActualRenderDefinition;
  sendFilters: FiltersRequest | null;
  sendPage: PaginationRequest | null;
  sendSort: SortingRequest | null;
} & SpecificDefinition;

export const DefinitionSchemaCommon = Schema.Struct({
  dataApiUrl: Schema.String,
  sorting: Schema.NullOr(SortingDefinitionSchema),
  sendSort: Schema.NullOr(SortingRequestSchema),
  filters: Schema.NullOr(FiltersDefinitionSchema),
  sendFilters: Schema.NullOr(FiltersRequestSchema),
  paging: Schema.NullOr(PaginationDefinitionSchema),
  sendPage: Schema.NullOr(PaginationRequestSchema),
});

export const createDefinitionSchema = <SpecificDefinitionSchema extends SpecificDefinitionSchemaType>(
  specificDefinition: SpecificDefinitionSchema
) => {
  return Schema.extend(DefinitionSchemaCommon, specificDefinition);
};
