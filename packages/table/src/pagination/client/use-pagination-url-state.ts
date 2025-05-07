import { parseAsInteger, parseAsIndex, useQueryStates } from "nuqs";
import { type PaginationState } from "../shared/pagination-state.js";
import type { PaginationDefinition } from "../shared/pagination-definition.js";
import { DEFAULT_PAGE_INDEX } from "../shared/get-default-pagination.js";
import type { GridID } from "../../shared/lib/grid-id.js";
import { useCallback } from "react";

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
};
const paginationUrlKeys = (id: GridID) => ({
  pageIndex: `${id}_page`,
  pageSize: `${id}_pageSize`,
});

export const usePaginationUrlState = ({ definition, id }: { definition: PaginationDefinition; id: GridID }) => {
  const [paginationState, setPaginationState] = useQueryStates(
    // `${id}_pagination`,
    // parseAsJson(Schema.decodeUnknownSync(PaginationStateSchema)).withDefault(getDefaultPagination(definition))
    paginationParsers,
    {
      urlKeys: paginationUrlKeys(id),
    }
  );

  const resetPagination = useCallback(() => {
    console.log("resetPagination", paginationState);
    setPaginationState({
      ...paginationState,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
  }, [paginationState, setPaginationState]);

  return {
    paginationState: paginationState as PaginationState,
    setPaginationState: setPaginationState as (state: PaginationState) => void,
    resetPagination,
  };
};
