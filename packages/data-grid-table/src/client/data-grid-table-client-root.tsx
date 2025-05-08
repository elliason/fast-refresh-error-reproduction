"use client";

import { ErrorMessage } from "@project/table/client/components/error-message";
import type { RequestResult } from "@project/request/shared/request-result";
import { use } from "react";
import { requestFailed } from "@project/request/shared/request-result";
import type { TableGridProps } from "../shared/table-grid-props.js";
import { LocalStateProvider } from "@project/table/client/components/local-state-provider";
import { URLStateProvider } from "@project/table/client/components/url-state-provider";
import type { TableGridDefinition } from "../shared/definition/table-grid-definition.js";
import { TableAdapter } from "./table-adapter.js";
import { LoadingFallback } from "@project/ui/components/loading-fallback";
import type { GridTableDataType } from "../shared/data/data-schema.js";
import { GridDataProvider } from "@project/table/client/data/data-provider";
import { GridFilters } from "@project/table/filtering/client/grid-filters";

export const DataGridTableClientRoot = ({
  children,
  //definitionRequest,
  definitionResult,
  renderers = {},
  id,
  debug = false,
  classNameModifiers = {},
  ...rest
}: {
  children?: React.ReactNode;
  //definitionRequest: Promise<RequestResult<TableGridDefinition>>;
  definitionResult: RequestResult<TableGridDefinition>;
} & TableGridProps) => {
  const { DefinitionError = ErrorMessage, DataError = ErrorMessage, DataLoadingFallback = LoadingFallback } = renderers;

  if (requestFailed(definitionResult)) {
    return <DefinitionError title="Failed to load definition!" description={definitionResult.error.message} />;
  }

  const StateProvider = (() => {
    if ("StateProvider" in rest && rest.StateProvider) {
      return rest.StateProvider;
    }
    if ("useURLState" in rest) {
      return URLStateProvider;
    }
    return LocalStateProvider;
  })();

  const dataLoader = (() => {
    if ("dataLoader" in rest) {
      return rest.dataLoader;
    }

    return rest.dataLoaderCreator({ id, dataFetcherFn: rest.dataFetcherFn, debug });
  })();

  const { data: definition } = definitionResult;

  if (debug) {
    console.log("definition", definition);
  }

  return (
    <StateProvider definition={definition} id={id}>
      {(state) => {
        if (debug) {
          console.log("state", state);
        }
        return (
          <GridDataProvider<GridTableDataType> definition={definition} id={id} loader={dataLoader}>
            {(query) => {
              if (debug) {
                console.log("query result", query);
                console.log("query.data", query.data);
              }

              if (query.error) {
                return <DataError title="Failed to load data!" description={query.error.message} />;
              }

              if (query.isLoading) {
                return <DataLoadingFallback />;
              }

              if (requestFailed(query.data)) {
                return <DataError title="Failed to load data!" description={query.data.error.message} />;
              }

              if (!query.data) {
                return <DataError title="Failed to load data!" description="No data" />;
              }

              return (
                <>
                  {definition.filters && (
                    <GridFilters
                      filtersDefinition={definition.filters}
                      filtersState={state.filtersState}
                      setFiltersState={state.setFiltersState}
                      multiselectOptions={{
                        placeholder: "Select",
                        searchPlaceholder: "Search",
                      }}
                      title={"Filtry"}
                      renderers={renderers["filter-renderers"]}
                      renderersByFilterName={renderers["filter-renderers-by-filter-name"]}
                    />
                  )}
                  <TableAdapter<GridTableDataType>
                    isFetching={query.isFetching}
                    data={query.data.data}
                    definition={definition}
                    renderers={renderers}
                    classNameModifiers={classNameModifiers}
                    state={state}
                  />
                </>
              );
            }}
          </GridDataProvider>
        );
      }}
    </StateProvider>
  );
};
