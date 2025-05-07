import { type RequestErrorResult, RequestResultErrorSchema } from './error-result.js';

import { Schema } from 'effect';

export const RequestResultSuccessSchema = <Data>(dataSchema: Schema.Schema<Data, any, never>) =>
    Schema.Struct({
        success: Schema.Literal(true),
        data: dataSchema,
    });
export type RequestResult_Success<Data> = Schema.Schema.Type<ReturnType<typeof RequestResultSuccessSchema<Data>>>;

export const RequestResultFailureSchema =
    /* <Error = RequestErrorResult> (errorSchema: Schema.Schema<Error, any, never>) =>*/
    Schema.Struct({
        success: Schema.Literal(false),
        error: /*errorSchema*/ RequestResultErrorSchema,
    });
export type RequestResult_Failure /* <Error = RequestErrorResult> */ = Schema.Schema.Type<
    /*ReturnType<typeof RequestResultFailureSchema  <Error> >*/
    typeof RequestResultFailureSchema
>;

export type RequestResult<Data, Error = RequestErrorResult> =
    | RequestResult_Success<Data>
    | RequestResult_Failure /* <Error> */;
export type PendingRequest<Data, Error = RequestErrorResult> = Promise<RequestResult<Data, Error>>;

export const RequestResultSchema = <Data>(dataSchema: Schema.Schema<Data, any, never>) =>
    Schema.Union(
        Schema.Struct({
            success: Schema.Literal(true),
            data: dataSchema,
        }),
        Schema.Struct({
            success: Schema.Literal(false),
            error: RequestResultErrorSchema,
        })
    );

export const requestFailed = Schema.is(
    RequestResultFailureSchema /*(
        Schema.Struct({
            success: Schema.Literal(false),
            error: RequestResultErrorSchema,
        })
    )*/
);
export const requestSucceeded = <Data>(result: RequestResult<Data>, dataSchema: Schema.Schema<Data, any, never>) =>
    Schema.is(RequestResultSuccessSchema(dataSchema))(result);
