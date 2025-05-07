import { useInfiniteQuery, type InfiniteData, type UseInfiniteQueryResult } from '@tanstack/react-query';

export type ListResponse<T> = {
    items: Array<T>;
    count: number;
};

type useListQueryProps = {
    url: string;
    limit?: number;
};

export type UseListQueryResult<T> = UseInfiniteQueryResult<InfiniteData<ListResponse<T>>>;

const fetchData = async <T,>(url: string, pageParam: number, limit: number): Promise<ListResponse<T>> => {
    const requestUrl = `${url}?from=${pageParam}&to=${pageParam + limit}`;
    return fetch(requestUrl, { method: 'GET' }).then((res) => {
        if (!res.ok) {
            throw new Error(`List request failed to url ${requestUrl}`);
        }
        // TODO: Runtime type check
        return res.json() as unknown as ListResponse<T>;
    });
};

export const useListQuery = <T,>({ url, limit = 10 }: useListQueryProps): UseListQueryResult<T> => {
    return useInfiniteQuery<ListResponse<T>, Error, InfiniteData<ListResponse<T>>, string[], number>({
        queryKey: ['list', url],
        queryFn: ({ pageParam }) => fetchData(url, pageParam, limit),
        getNextPageParam: (lastPage, _, lastParam) =>
            lastPage.count === limit ? lastParam + lastPage.count : undefined,
        initialPageParam: 0,
    });
};
