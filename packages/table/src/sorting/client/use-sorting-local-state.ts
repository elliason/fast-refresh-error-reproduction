import { useCallback, useState } from "react";
import type { SortingDefinition } from "../shared/sorting-definition.js";
import { getDefaultSorting } from "../shared/get-default-sorting.js";
import type { SortingState } from "../shared/sorting-state.js";

export const useSortingLocalState = ({ definition }: { definition: SortingDefinition }) => {
  const [sortingState, setSortingState] = useState<SortingState>(getDefaultSorting(definition));

  const resetSorting = useCallback(() => {
    setSortingState(getDefaultSorting(definition));
  }, [definition, setSortingState]);

  return {
    sortingState,
    resetSorting,
    setSortingState,
  };
};
