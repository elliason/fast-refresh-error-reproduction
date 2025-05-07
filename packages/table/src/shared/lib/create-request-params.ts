import type { RequestParams } from "./request-params.js";
import type { GridState } from "../../client/state/state.js";
import type { GridDefinition } from "./definition.js";
import type { FiltersDefinition } from "../../filtering/shared/filters-definition.js";
import { capitalize } from "effect/String";

export const createRequestParams = ({
  state,
  definition,
}: {
  state: GridState;
  definition: GridDefinition;
}): RequestParams => {
  const { filtersState, paginationState, sortingState } = state;

  const query: Record<string, unknown> = {};
  const body: Record<string, unknown> = {};

  // Filters
  const { query: queryFiltersParams, body: bodyFiltersParams } = (() => {
    const query: Record<string, unknown> = {};
    const body: Record<string, unknown> = {};

    if (filtersState && definition.filters && definition.sendFilters) {
      definition.filters.forEach((filter) => {
        const filterValue = filtersState[filter.name];
        if (filterValue === undefined) return;

        if (definition.sendFilters?.placement === "QUERY") {
          query[`${definition.sendFilters.parameterNamePrefix}${capitalize(filter.name)}`] = filterValue;
        }

        if (definition.sendFilters?.placement === "BODY") {
          body[`${definition.sendFilters?.parameterNamePrefix}${capitalize(filter.name)}`] = filterValue;
        }
      });
    }
    return { query, body };
  })();

  // Pagination
  const { query: queryPageParams, body: bodyPageParams } = (() => {
    const query: Record<string, unknown> = {};
    const body: Record<string, unknown> = {};

    if (paginationState === null || !definition.paging || !definition.sendPage) return { query, body };

    if (definition.sendPage.placement === "QUERY") {
      query[definition.sendPage.pageParamName] = paginationState?.pageIndex + 1;
      query[definition.sendPage.sizeParamName] = paginationState?.pageSize;
    }

    if (definition.sendPage.placement === "BODY") {
      body[definition.sendPage.pageParamName] = paginationState?.pageIndex + 1;
      body[definition.sendPage.sizeParamName] = paginationState?.pageSize;
    }

    return { query, body };
  })();

  // Sorting
  const { query: querySortParams, body: bodySortParams } = (() => {
    const query: Record<string, unknown> = {};
    const body: Record<string, unknown> = {};

    if (sortingState === null || !definition.sorting || !definition.sendSort) return { query, body };

    if (definition.sendSort.placement === "QUERY") {
      query[definition.sendSort.sortParamName] = sortingState.columnName;
      query[definition.sendSort.directionParamName] = sortingState.columnOrder;
    }

    if (definition.sendSort.placement === "BODY") {
      body[definition.sendSort.sortParamName] = sortingState.columnName;
      body[definition.sendSort.directionParamName] = sortingState.columnOrder;
    }

    return { query, body };
  })();

  return {
    query: { ...queryFiltersParams, ...queryPageParams, ...querySortParams },
    body: { ...bodyFiltersParams, ...bodyPageParams, ...bodySortParams },
  };
};
