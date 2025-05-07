import { Cause, Effect, Exit, Schedule, Schema } from 'effect';
import type { FetchResponse } from 'openapi-fetch';
import { getErrorResult, type RequestErrorResult } from './error-result.js';
import { type RequestResult } from './request-result.js';
import { FetchError } from './errors/fetch-error.js';
import { ServerError } from './errors/server-error.js';

// TODO: get better types and get rid of any's
// TODO: check against openapi
/**
 * Takes a request and optionally a schema and returns a promise that resolves to the request result.
 *
 * @param request - The request to fetch data from the server. Create this using our api client.
 * @param schema - The schema to decode the response data with.
 *
 * @returns Promise<RequestResult<Data>> - RequestResult is a union of RequestResult_Success and RequestResult_Failure.
 * RequestResult_Failure contains serializable error information - so that it can be transported across the network.
 *
 * @example - Passing unresolved request to a client component in a suspense boundary
 * ```ts
 * import { getAPIClient } from '~/common/api';
 * import { handleRequest } from '~/common/api';
 *
 * const client = await getAPIClient();
 * const request = client.GET(<resource_path>, <request_options>);
 * const requestWrapper = handleRequest(request, <Schema>);
 *
 * return <Suspense fallback={<div>Loading...</div>}><ClientComponent request={requestWrapper} /></Suspense>;
 * ```
 *
 * @example - Handling request in a server component
 * ```ts
 * import { getAPIClient } from '~/common/api';
 * import { handleRequest } from '~/common/api';
 *
 * const client = await getAPIClient();
 * const request = client.GET(<resource_path>, <request_options>);
 * const result = await handleRequest(request, <Schema>);
 *
 * if (result.success) {
 *     return <div>{result.data}</div>;
 * } else {
 *     return <div>Error: {result.error.message}</div>;
 * }
 * ```
 */
export const handleRequest = async <Data, EncodedData>(
    request: PromiseLike<FetchResponse<any, any, any>>,
    schema?: Schema.Schema<Data, EncodedData, never>
): Promise<RequestResult<Data, RequestErrorResult>> => {
    const exit = await Effect.gen(function* () {
        const { response, error, data } = yield* Effect.tryPromise({
            try: () => request,
            catch: (error) => {
                return new FetchError({ error });
            },
        });

        // TODO: consider better handling of 401
        if (response.status === 401) {
            yield* Effect.fail(new ServerError({ error: { errorMessage: 'Unauthorized' }, response }));
        }

        if (error) {
            yield* Effect.fail(new ServerError({ error, response }));
        }

        if (schema) {
            const parsed = yield* Schema.decodeUnknown(schema)(data);
            return { data: parsed } as const;
        }

        return { data: data as Data } as const;
    }).pipe(
        Effect.scoped,
        Effect.retry({
            times: 3,
            schedule: Schedule.exponential(1000),
            while: (error) => {
                if (error instanceof FetchError) {
                    return true;
                }
                return false;
            },
        }),
        Effect.tapErrorCause((cause) => Effect.logWarning(Cause.pretty(cause))),
        Effect.runPromiseExit
    );

    return Exit.match(exit, {
        onSuccess: (data) => {
            return {
                success: true,
                data: data.data,
            };
        },
        onFailure: (cause) => {
            return {
                success: false,
                error: getErrorResult(cause),
            };
        },
    });
};

export const handleRequestWithThrowing = async <Data, EncodedData>(
    request: PromiseLike<FetchResponse<any, any, any>>,
    schema?: Schema.Schema<Data, EncodedData, never>
) => {
    const result = await handleRequest(request, schema);
    if (result.success) {
        return result.data;
    }
    throw result.error;
};
