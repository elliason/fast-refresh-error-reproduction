import type { GridStateManagerReturn } from "../state/state.js";
import type { GridDefinition } from "../../shared/lib/definition.js";
import { useFilteringLocalState } from "../../filtering/client/use-filtering-local-state.js";
import { usePaginationLocalState } from "../../pagination/client/use-pagination-local-state.js";
import { useSortingLocalState } from "../../sorting/client/use-sorting-local-state.js";

export const useLocalState = ({ definition }: { definition: GridDefinition }): GridStateManagerReturn => {
  const { paginationState, setPaginationState, resetPagination } = usePaginationLocalState({
    definition: definition.paging,
  });
  const { filtersState, setFiltersState } = useFilteringLocalState({
    definition: definition.filters,
    resetPagination,
  });
  const { sortingState, setSortingState } = useSortingLocalState({ definition: definition.sorting });

  return {
    filtersState,
    paginationState,
    sortingState,
    setFiltersState,
    setPaginationState,
    setSortingState,
  };
};
