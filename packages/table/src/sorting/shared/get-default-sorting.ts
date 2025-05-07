import type { SortingDefinition } from "./sorting-definition.js";
import type { SortingState } from "./sorting-state.js";

export const getDefaultSorting = (definition: SortingDefinition): SortingState => {
  if (!definition || !definition.defaultSort) {
    return {
      columnName: "",
      columnOrder: null,
    };
  }
  return {
    columnName: definition.defaultSort.name,
    columnOrder: definition.defaultSort.direction,
  };
};
