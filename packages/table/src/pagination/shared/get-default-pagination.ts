import type { PaginationDefinition } from "./pagination-definition.js";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export const getDefaultPagination = (definition: PaginationDefinition) => {
  return {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: definition.defaultSize || DEFAULT_PAGE_SIZE,
  };
};
