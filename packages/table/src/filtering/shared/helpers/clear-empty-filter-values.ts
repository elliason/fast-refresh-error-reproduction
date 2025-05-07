import type { FiltersState } from "../filters-state.js";

export const clearEmptyFilterValues = (filtersState: FiltersState) => {
  return Object.entries(filtersState).reduce((acc, [key, value]) => {
    if (value === undefined) {
      return acc;
    }
    if (Array.isArray(value) && value.length === 0) {
      return acc;
    }
    if (typeof value === "string" && value.length === 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {} as FiltersState);
};
