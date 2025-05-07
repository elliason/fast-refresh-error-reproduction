import type { DefinitionLoader } from "@project/table/shared/lib/definition-loader";
import type { DataLoader, DataLoaderTrpc } from "@project/table/shared/lib/data-loader";
import type { GridID } from "@project/table/shared/lib/grid-id";
import type { ErrorMessage } from "@project/table/client/components/error-message";
import type { TableGridDefinition } from "./definition/table-grid-definition.js";
import type { GridTableDataType } from "./data/data-schema.js";
import type { StateProvider } from "@project/table/client/components/state-provider";
import type { GridState } from "@project/table/client/state/state";
import type { IconContent } from "./data/icon-content.js";
import type { ButtonContent } from "./data/button-content.js";
import type { BackendAction, LinkAction, RouteAction } from "./data/actions.js";
import type { TextContent } from "./data/text-content.js";
import type { Cell } from "./data/cell.js";
import type { InlineCollectionContent } from "./data/inline-collection-content.js";
import type { InlineListContent } from "./data/inline-list-content.js";
import type { ListContent } from "./data/list-content.js";
import type { LinkContent } from "./data/link-content.js";
import type { FilterRenderers, RenderersByFilterName } from "@project/table/filtering/shared/filter-renderers";
import type { ColumnHeaderProps } from "../client/rendering/column-header.js";
import type { ColumnDefinition } from "./definition/table-rendering-definition.js";
import type { RequestParams } from "@project/table/shared/lib/request-params";
import type { RequestResult } from "@project/request/shared/request-result";

export type CellContentTextComponent = React.ComponentType<{ content: TextContent; column: ColumnDefinition }>;
export type CellContentIconComponent = React.ComponentType<{ content: IconContent; column: ColumnDefinition }>;
export type CellContentButtonComponent = React.ComponentType<{
  content: ButtonContent;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentLinkActionComponent = React.ComponentType<{
  content: LinkAction;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentRouteActionComponent = React.ComponentType<{
  content: RouteAction;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentBackendActionComponent = React.ComponentType<{
  content: BackendAction;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentInlineCollectionComponent = React.ComponentType<{
  content: InlineCollectionContent;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentInlineListComponent = React.ComponentType<{
  content: InlineListContent;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentListComponent = React.ComponentType<{
  content: ListContent;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;
export type CellContentLinkComponent = React.ComponentType<{
  content: LinkContent;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;

export interface CellContentRenderers {
  Button?: CellContentButtonComponent;
  LinkAction?: CellContentLinkActionComponent;
  RouteAction?: CellContentRouteActionComponent;
  BackendAction?: CellContentBackendActionComponent;
  InlineCollection?: CellContentInlineCollectionComponent;
  InlineList?: CellContentInlineListComponent;
  List?: CellContentListComponent;
  Icon?: CellContentIconComponent;
  Text?: CellContentTextComponent;
  Link?: CellContentLinkComponent;
}

export type CellContentComponent = React.ComponentType<{
  content: Cell["content"] | undefined;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}>;

type StateProviderProps = {
  StateProvider?: StateProvider<GridState, TableGridDefinition>;
  useURLState?: boolean;
};

export type DataFetcherFn<DataType> = ({ params }: { params: RequestParams }) => Promise<RequestResult<DataType>>;

export type DataLoaderCreator<DataType> = ({
  id,
  dataFetcherFn,
  debug,
}: {
  id: GridID;
  dataFetcherFn: DataFetcherFn<DataType>;
  debug?: boolean;
}) => DataLoader<DataType> | DataLoaderTrpc<DataType>;

export type DataLoaderProps<DataType> =
  | { dataLoader: DataLoader<DataType> | DataLoaderTrpc<DataType> }
  | { dataLoaderCreator: DataLoaderCreator<DataType>; dataFetcherFn: DataFetcherFn<DataType> };

export type TableGridProps = {
  debug?: boolean;
  id: GridID;
  definitionFetcherFn: DefinitionLoader<TableGridDefinition>;
  renderers?: {
    DataError?: React.ComponentType<React.ComponentProps<typeof ErrorMessage>>;
    DefinitionError?: React.ComponentType<React.ComponentProps<typeof ErrorMessage>>;
    DefinitionLoadingFallback?: React.ComponentType;
    DataLoadingFallback?: React.ComponentType;
    CellContent?: CellContentComponent;
    ColumnHeader?: React.ComponentType<ColumnHeaderProps>;
    "content-renderers"?: CellContentRenderers;
    "filter-renderers"?: FilterRenderers;
    "filter-renderers-by-filter-name"?: RenderersByFilterName;
    "cell-content-by-column-name"?: Record<
      string,
      React.ComponentType<{ content: Cell["content"] | undefined; column: ColumnDefinition }>
    >;
    "cell-content-by-content-type"?: Record<
      string,
      React.ComponentType<{ content: Cell["content"] | undefined; column: ColumnDefinition }>
    >;
  };
  classNameModifiers?: {
    CellContentWrapper?: string;
    "cell-content-wrapper-by-column-name"?: Record<string, string>;
    "cell-content-wrapper-by-content-type"?: Record<string, string>;
  };
} & StateProviderProps &
  DataLoaderProps<GridTableDataType>;
