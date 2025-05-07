import React from "react";
import type { FiltersState } from "../shared/filters-state.js";
import type { FiltersDefinition } from "../shared/filters-definition.js";
import { getFilterDefaultValues } from "../shared/get-filters-default-values.js";

export const useFilteringLocalState = ({
  definition,
  resetPagination,
}: {
  definition: FiltersDefinition;
  resetPagination: () => void;
}) => {
  const [filtersState, setFiltersStateInternal] = React.useState<FiltersState>(getFilterDefaultValues(definition));

  const setFiltersState = React.useCallback(
    (newFilters: FiltersState) => {
      setFiltersStateInternal(newFilters);
      resetPagination();
    },
    [resetPagination, setFiltersStateInternal]
  );

  return {
    filtersState,
    setFiltersState,
  };
};
