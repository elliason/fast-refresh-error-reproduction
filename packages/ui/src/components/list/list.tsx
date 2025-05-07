import { type UseInfiniteQueryResult } from '@tanstack/react-query';
import { useListQuery, type UseListQueryResult } from './hooks/useListQuery.js';

export type ListProps<T> = {
    url: string;
    limit?: number;
    children(props: UseListQueryResult<T>): React.ReactNode;
};

export const List = <T,>({ url, limit = 10, children }: ListProps<T>) => {
    const infiniteQueryProps = useListQuery<T>({ url, limit });

    return <>{children(infiniteQueryProps)}</>;
};

export const ListPaggination = <T,>({
    hasNextPage,
    fetchNextPage,
    isFetching,
}: Pick<UseInfiniteQueryResult<T>, 'hasNextPage' | 'fetchNextPage' | 'isFetching'>) => {
    return (
        <button disabled={!hasNextPage || isFetching} onClick={() => fetchNextPage()}>
            {isFetching ? 'Loading...' : hasNextPage ? 'Load more' : 'No more data'}
        </button>
    );
};
