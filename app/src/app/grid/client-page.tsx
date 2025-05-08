"use client";

import { RequestResult } from "@project/request/shared/request-result";
import { TableGridDefinition } from "@project/data-grid-table/shared/definition/table-grid-definition";
import { DataGridTableClientRoot } from "@project/data-grid-table/client/data-grid-table-client-root";
import { GridID } from "@project/table/shared/lib/grid-id";
import { getTableData, getTableDefinition } from "../_table/get-table-data";
import { createDataLoader } from "@project/table/client/data/create-data-loader";
import { useLocalState } from "@project/table/client/hooks/use-local-state";
import { createRequestParams } from "@project/table/shared/lib/create-request-params";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GridTableDataType } from "@project/data-grid-table/shared/data/data-schema";
import { TableAdapter } from "@project/data-grid-table/client/table-adapter";
import { GridFilters } from "@project/table/filtering/client/grid-filters";
import { LoadingFallback } from "@project/ui/components/loading-fallback";
import { ErrorMessage } from "@project/table/client/components/error-message";
import { RequestParams } from "@project/table/shared/lib/request-params";
import { useEffect, useState } from "react";

export default function GridClientPage({
  tableDefinition,
  getData,
}: {
  tableDefinition: TableGridDefinition;
  getData: ({ requestParams }: { requestParams: RequestParams }) => Promise<RequestResult<GridTableDataType>>;
}) {
  console.log("tableDefinition", tableDefinition);
  const state = useLocalState({ definition: tableDefinition });
  const params = createRequestParams({ state, definition: tableDefinition });

  /* const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<GridTableDataType | null>(null);
  useEffect(() => {
    setIsFetching(true);
    getData({ requestParams: params }).then((result) => {
      if (result.success) {
        setData(result.data);
      }
      setIsFetching(false);
    });
  }, []); */

  const { data, ...query } = useQuery({
    queryKey: ["table-data"],
    queryFn: () => getData({ requestParams: params }),
    placeholderData: keepPreviousData,
  });

  console.log("data", data);

  if (query.isLoading) {
    return <LoadingFallback />;
  }

  if (query.isError || !data || !data.success) {
    return <ErrorMessage title="Error" description="Error fetching table data" />;
  }

  return (
    <>
      {tableDefinition.filters && (
        <GridFilters
          filtersDefinition={tableDefinition.filters}
          filtersState={state.filtersState}
          setFiltersState={state.setFiltersState}
          multiselectOptions={{
            placeholder: "Select",
            searchPlaceholder: "Search",
          }}
          title={"Filtry"}
        />
      )}
      {data && data.success && (
        <TableAdapter<GridTableDataType>
          isFetching={query.isFetching}
          data={data.data}
          definition={tableDefinition}
          state={state}
        />
      )}
    </>
  );

  /* return (
    <DataGridTableClientRoot
      definitionResult={{ success: true, data: tableDefinition }}
      id={GridID("no-features-grid")}
      definitionFetcherFn={getTableDefinition}
      dataLoader={noFeaturesGridDataLoader}
      useURLState
    />
  ); */
}
