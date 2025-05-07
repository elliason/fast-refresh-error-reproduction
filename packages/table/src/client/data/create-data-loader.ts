import { keepPreviousData, type QueryFunction } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { GridID } from '../../shared/lib/grid-id.js';
import type { RequestParams } from '../../shared/lib/request-params.js';

export const createDataLoader =
    ({
        id,
        queryFn,
        debug = false,
    }: {
        id: GridID;
        queryFn: ({ params }: { params: RequestParams }) => Promise<any>;
        debug?: boolean;
    }) =>
    ({ params }: { params: RequestParams }) => {
        if (debug) {
            console.log('params', params);
        }

        const queryResult = useQuery({
            queryKey: [`grid-data-${id}`, params],
            queryFn: () => queryFn({ params }),
            placeholderData: keepPreviousData,
        });

        return queryResult;
    };
