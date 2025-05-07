import type { GridDefinition } from '../../shared/lib/definition.js';
import { useGridState } from '../state/state-context.js';
import { createRequestParams } from '../../shared/lib/create-request-params.js';
import type {
    DataLoader,
    DataLoaderResult,
    DataLoaderTrpc,
    DataLoaderTrpcResult,
} from '../../shared/lib/data-loader.js';

export const GridDataProvider = <DataType,>({
    definition,
    id,
    loader,
    children,
}: {
    definition: GridDefinition;
    id: string;
    loader: DataLoader<DataType> | DataLoaderTrpc<DataType>;
    children: (data: DataLoaderResult<DataType> | DataLoaderTrpcResult<DataType>) => React.ReactNode;
}) => {
    const state = useGridState();
    const params = createRequestParams({ state, definition });

    const data = loader({ params });

    return children(data);
};
