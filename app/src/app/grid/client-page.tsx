"use client";

import { TableGridDefinition } from "@project/data-grid-table/shared/definition/table-grid-definition";
import { DataGridTableClientRoot } from "@project/data-grid-table/client/data-grid-table-client-root";
import { GridID } from "@project/table/shared/lib/grid-id";
import { getTableData, getTableDefinition } from "../_table/get-table-data";
import { createDataLoader } from "@project/table/client/data/create-data-loader";

const noFeaturesGridDataLoader = createDataLoader({
  id: GridID("no-features-grid"),
  queryFn: async ({ params }) => {
    const response = await getTableData({ query: params.query });
    return response;
  },
});

export default function GridClientPage({ tableDefinition }: { tableDefinition: TableGridDefinition }) {
  console.log("tableDefinition", tableDefinition);
  return (
    <DataGridTableClientRoot
      definitionResult={{ success: true, data: tableDefinition }}
      id={GridID("no-features-grid")}
      definitionFetcherFn={getTableDefinition}
      dataLoader={noFeaturesGridDataLoader}
      useURLState
    />
  );
}
