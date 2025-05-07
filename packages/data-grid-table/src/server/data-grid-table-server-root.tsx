import { Suspense } from "react";

import { DataGridTableClientRoot } from "../client/data-grid-table-client-root.js";
import type { TableGridProps } from "../shared/table-grid-props.js";
import { GridID } from "@project/table/shared/lib/grid-id";

export const DataGridTableServerRoot = async ({ renderers = {}, ...rest }: TableGridProps) => {
  const { debug = false, id, definitionFetcherFn } = rest;
  const { DefinitionLoadingFallback } = renderers;

  const gridDefinitionRequest = definitionFetcherFn({ debug, id });

  return (
    <Suspense fallback={DefinitionLoadingFallback ? <DefinitionLoadingFallback /> : <div>Loading...</div>}>
      <DataGridTableClientRoot
        definitionRequest={gridDefinitionRequest}
        renderers={renderers}
        {...rest}
        id={GridID(id)}
      />
    </Suspense>
  );
};
