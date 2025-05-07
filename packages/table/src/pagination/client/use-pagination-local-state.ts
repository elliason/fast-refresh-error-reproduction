import React, { useCallback } from "react";
import type { PaginationState } from "../shared/pagination-state.js";
import type { PaginationDefinition } from "../shared/pagination-definition.js";
import { DEFAULT_PAGE_INDEX, getDefaultPagination } from "../shared/get-default-pagination.js";

export const usePaginationLocalState = ({ definition }: { definition: PaginationDefinition | null }) => {
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    getDefaultPagination(definition ?? { defaultSize: null, sizeOptions: [] })
  );

  const resetPagination = useCallback(() => {
    setPaginationState({
      ...paginationState,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
  }, [paginationState, setPaginationState]);

  return {
    paginationState,
    setPaginationState,
    resetPagination,
  };
};
