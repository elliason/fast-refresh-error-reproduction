import type { RequestParams } from "./request-params.js";
import type { RequestResult } from "@project/request/shared/request-result";
import type { UseQueryResult, UseInfiniteQueryResult } from "@tanstack/react-query";
/* import type { TRPCClientErrorBase } from "@trpc/client";
import type { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import"; */

export type DataLoaderResult<DataType> = UseQueryResult<RequestResult<DataType>>;
export type DataLoaderTrpcResult<DataType> = UseQueryResult<
  RequestResult<DataType>
  /* TRPCClientErrorBase<DefaultErrorShape> */
>;
export type InfiniteDataLoaderResult<DataType> = UseInfiniteQueryResult<RequestResult<DataType>>;

export type DataLoader<DataType> = ({ params }: { params: RequestParams }) => DataLoaderResult<DataType>;
export type DataLoaderTrpc<DataType> = ({ params }: { params: RequestParams }) => DataLoaderTrpcResult<DataType>;

export type InfiniteDataLoader<DataType> = ({
  params,
}: {
  params: RequestParams;
}) => InfiniteDataLoaderResult<DataType>;
