import type { CursorRequestParams } from "./cursor-pagination-schema.js";

export const getCursorPaginationQueryString = (params: CursorRequestParams) => {
  const query = new URLSearchParams();
  if (params.pageAfterCursor) {
    query.set("pageAfterCursor", params.pageAfterCursor);
  }
  if (params.pageBeforeCursor) {
    query.set("pageBeforeCursor", params.pageBeforeCursor);
  }
  if (params.pageSize) {
    query.set("pageSize", params.pageSize.toString());
  }

  return query.toString();
};
