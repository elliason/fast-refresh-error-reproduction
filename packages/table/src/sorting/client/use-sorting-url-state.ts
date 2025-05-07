import { useCallback, useState } from "react";
import type { SortingDefinition } from "../shared/sorting-definition.js";
import { getDefaultSorting } from "../shared/get-default-sorting.js";
import { sortDirections, type SortingState } from "../shared/sorting-state.js";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import type { GridID } from "../../shared/lib/grid-id.js";

const sortingParsers = {
  columnName: parseAsString,
  columnOrder: parseAsStringLiteral(sortDirections),
};

const sortingUrlKeys = (id: GridID) => ({
  columnName: `${id}_sortColumn`,
  columnOrder: `${id}_sortOrder`,
});

export const useSortingUrlState = ({ definition, id }: { definition: SortingDefinition; id: GridID }) => {
  const [sortingState, setSortingState] = useQueryStates(sortingParsers, {
    urlKeys: sortingUrlKeys(id),
    clearOnDefault: true,
  });

  const resetSorting = useCallback(() => {
    setSortingState(getDefaultSorting(definition));
  }, [definition, setSortingState]);

  return {
    sortingState: sortingState as SortingState,
    resetSorting,
    setSortingState,
  };
};
