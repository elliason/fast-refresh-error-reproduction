import type { RequestParams } from "./request-params.js";

export const createUrlQueryFromParams = (params: Exclude<RequestParams["query"], undefined>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    if (Array.isArray(value) && value.length === 0) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => {
        query.append(key, String(v));
      });
    } else {
      query.append(key, String(value));
    }
  });
  return query.toString();
};
