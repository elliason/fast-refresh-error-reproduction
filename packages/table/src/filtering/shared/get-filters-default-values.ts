import type { GridID } from "../../shared/lib/grid-id.js";
import type { FiltersDefinition } from "./filters-definition.js";
import type { FiltersState } from "./filters-state.js";

export const getFilterDefaultValues = (filters: FiltersDefinition): FiltersState => {
  return filters.reduce((acc, curr) => {
    if (curr.input.defaultValue !== undefined) {
      acc[curr.name] = "";
    }
    acc[curr.name] = curr.input.defaultValue;
    return acc;
  }, {} as FiltersState);
};
