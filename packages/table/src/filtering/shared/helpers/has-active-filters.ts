import type { FiltersState } from "../filters-state.js";

export const hasActiveFilters = (filtersState: FiltersState) => {
  return Object.values(filtersState).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === "string") {
      return value.length > 0;
    }
    return value !== undefined;
  });
};
