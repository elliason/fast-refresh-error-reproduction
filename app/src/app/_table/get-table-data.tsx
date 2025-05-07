"use server";

import { GridTableDataType } from "@project/data-grid-table/shared/data/data-schema";
import { RequestErrorResult } from "@project/request/shared/error-result";
import { RequestResult } from "@project/request/shared/request-result";
import { createUrlQueryFromParams } from "@project/table/shared/lib/create-url-from-params";
import { RequestParams } from "@project/table/shared/lib/request-params";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

export const getTableDefinition = async () => {
  const response = await fetch(`${BE_URL}/grid/definition/no-features`);
  const data = await response.json();
  return data;
};

export const getTableData = async ({ query }: { query: RequestParams["query"] }) => {
  const paramsAsString = createUrlQueryFromParams(query || {});
  try {
    const request = await fetch(`${BE_URL}/grid/data/no-features?${paramsAsString}`);
    const response = await request.json();
    return { success: true, data: response } as RequestResult<GridTableDataType>;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {
        type: "server_error",
        message: "Failed to fetch table data",
      } satisfies RequestErrorResult,
    };
  }
};
