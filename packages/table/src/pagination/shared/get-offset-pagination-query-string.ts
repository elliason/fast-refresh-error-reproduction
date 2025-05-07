import type { OffsetPaging } from "./offset-pagination-schema.js";

export const getOffsetPaginationQueryString = (params: OffsetPaging | null) => {
  if (!params) {
    return "";
  }
  const query = new URLSearchParams();
  if (params.page) {
    query.set("page", params.page.toString());
  }
  if (params.pageSize) {
    query.set("pageSize", params.pageSize.toString());
  }

  return query.toString();
};
