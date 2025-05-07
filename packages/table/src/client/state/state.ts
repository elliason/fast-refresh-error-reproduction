import type { FiltersState } from "../../filtering/shared/filters-state.js";
import type { PaginationState } from "../../pagination/shared/pagination-state.js";
import type { SortingState } from "../../sorting/shared/sorting-state.js";

export type GridState = {
  filtersState: FiltersState | null;
  paginationState: PaginationState | null;
  sortingState: SortingState | null;
};

export type SetFiltersState = (filters: FiltersState, preservePagination?: boolean) => void;
export type SetSortingState = (sorting: SortingState) => void;
export type SetPaginationState = (pagination: PaginationState) => void;

export type GridStateActions = {
  setFiltersState: SetFiltersState;
  setSortingState: SetSortingState;
  setPaginationState: SetPaginationState;
};

export type GridStateManagerReturn = GridState & GridStateActions;
