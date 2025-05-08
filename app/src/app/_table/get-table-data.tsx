"use client";

import { GridTableDataType } from "@project/data-grid-table/shared/data/data-schema";
import { TableGridDefinition } from "@project/data-grid-table/shared/definition/table-grid-definition";
import { RequestErrorResult } from "@project/request/shared/error-result";
import { RequestResult } from "@project/request/shared/request-result";
import { createUrlQueryFromParams } from "@project/table/shared/lib/create-url-from-params";
import { RequestParams } from "@project/table/shared/lib/request-params";

const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

export const getTableDefinition = async () => {
  try {
    const response = await fetch(`/api/grid-definition`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: {
        type: "server_error",
        message: "Failed to fetch table definition",
      } satisfies RequestErrorResult,
    };
  }
};

export const getTableData = async ({
  requestParams,
}: {
  requestParams: RequestParams;
}): Promise<RequestResult<GridTableDataType>> => {
  const paramsAsString = createUrlQueryFromParams(requestParams.query || {});
  try {
    const request = await fetch(`http://localhost:3000/api/grid-data?${paramsAsString}`);
    const response = await request.json();
    return { success: true, data: response };
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
