import { useFilteringUrlState } from "../../filtering/client/use-filtering-url-state.js";
import { usePaginationUrlState } from "../../pagination/client/use-pagination-url-state.js";
import type { GridDefinition } from "../../shared/lib/definition.js";
import type { GridID } from "../../shared/lib/grid-id.js";
import { useSortingUrlState } from "../../sorting/client/use-sorting-url-state.js";
import type { GridStateManagerReturn } from "../state/state.js";

export const useUrlState = ({ definition, id }: { definition: GridDefinition; id: GridID }): GridStateManagerReturn => {
  const { paginationState, setPaginationState, resetPagination } = usePaginationUrlState({
    definition: definition.pagination,
    id,
  });
  const { filtersState, setFiltersState } = useFilteringUrlState({
    definition: definition.filters,
    resetPagination,
    id,
  });
  const { sortingState, setSortingState } = useSortingUrlState({ definition: definition.sorting, id });

  return {
    filtersState,
    paginationState,
    sortingState,
    setFiltersState,
    setPaginationState,
    setSortingState,
  };
};
