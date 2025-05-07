import { createRequestParams } from '../../shared/lib/create-request-params.js';
import type { InfiniteDataLoader, InfiniteDataLoaderResult } from '../../shared/lib/data-loader.js';
import type { GridDefinition } from '../../shared/lib/definition.js';
import { useGridState } from '../state/state-context.js';

export const InfiniteGridDataProvider = <DataType,>({
    definition,
    id,
    loader,
    children,
}: {
    definition: GridDefinition;
    id: string;
    loader: InfiniteDataLoader<DataType>;
    children: (data: InfiniteDataLoaderResult<DataType>) => React.ReactNode;
}) => {
    const state = useGridState();
    const params = createRequestParams({ state, definition });

    const data = loader({ params });

    return children(data);
};
