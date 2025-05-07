import { Cause, ParseResult, Schema } from 'effect';
import { validateSchema } from './schema-validation.js';
import { type DeepReadonly } from 'ts-essentials';
import { ServerError } from './errors/server-error.js';
import { FetchError } from './errors/fetch-error.js';
import { ParseError } from 'effect/ParseResult';

export type RequestErrorResult_FetchError = { type: 'fetch_error'; message: string };
export const RequestErrorResult_FetchErrorSchema = Schema.Struct({
    type: Schema.Literal('fetch_error'),
    message: Schema.String,
});

export type RequestErrorResult_ParseError = { type: 'parse_error'; message: string };
export const RequestErrorResult_ParseErrorSchema = Schema.Struct({
    type: Schema.Literal('parse_error'),
    message: Schema.String,
});

export type RequestErrorResult_TypeCheckError = { type: 'type_check_error'; message: string };
export const RequestErrorResult_TypeCheckErrorSchema = Schema.Struct({
    type: Schema.Literal('type_check_error'),
    message: Schema.String,
});

export type RequestErrorResult_Other = { type: 'other'; message: string };
export const RequestErrorResult_OtherSchema = Schema.Struct({
    type: Schema.Literal('other'),
    message: Schema.String,
});

export type RequestErrorResult_ServerError = {
    type: 'server_error';
    message: string;
    status?: number | undefined;
    technicalDetails?: string | undefined | null;
    fieldErrors?: readonly { fieldName: string; errorMessage: string }[] | undefined;
    fieldName?: string | undefined;
};
export const RequestErrorResult_ServerErrorSchema = Schema.Struct({
    type: Schema.Literal('server_error'),
    message: Schema.String,
    status: Schema.optional(Schema.Number),
    technicalDetails: Schema.optional(Schema.NullishOr(Schema.String)),
    fieldErrors: Schema.optional(
        Schema.Array(Schema.Struct({ fieldName: Schema.String, errorMessage: Schema.String }))
    ),
    fieldName: Schema.optional(Schema.String),
});

export type RequestErrorResult_Defect = { type: 'defect'; message: string };
export const RequestErrorResult_DefectSchema = Schema.Struct({
    type: Schema.Literal('defect'),
    message: Schema.String,
});

export type RequestErrorResult =
    | RequestErrorResult_FetchError
    | RequestErrorResult_ParseError
    | RequestErrorResult_TypeCheckError
    | RequestErrorResult_Defect
    | RequestErrorResult_Other
    | RequestErrorResult_ServerError;

export const RequestResultErrorSchema = Schema.Union(
    RequestErrorResult_FetchErrorSchema,
    RequestErrorResult_ParseErrorSchema,
    RequestErrorResult_TypeCheckErrorSchema,
    RequestErrorResult_DefectSchema,
    RequestErrorResult_OtherSchema,
    RequestErrorResult_ServerErrorSchema
);
validateSchema<DeepReadonly<RequestErrorResult>>(RequestResultErrorSchema);

export const getErrorResult = (cause: Cause.Cause<ServerError | FetchError | ParseResult.ParseError>) => {
    if (Cause.isFailType(cause)) {
        const error = cause.error; // the underlying error

        // server responded with 40x or 50x status code
        if (error instanceof ServerError) {
            return {
                type: 'server_error',
                message: error.error.errorMessage,
                status: error.response.status,
                technicalDetails: 'technicalDetails' in error.error ? error.error.technicalDetails : undefined,
                fieldErrors: 'fieldErrors' in error.error ? error.error.fieldErrors : undefined,
                fieldName: 'fieldName' in error.error ? error.error.fieldName : undefined,
            } as const satisfies RequestErrorResult_ServerError;
        }

        // fetch failed due to network error
        if (error instanceof FetchError) {
            return {
                type: 'fetch_error',
                message: error.message,
            } as const satisfies RequestErrorResult_FetchError;
        }

        // schema parsing failed
        if (error instanceof ParseError) {
            return {
                type: 'parse_error',
                message: ParseResult.TreeFormatter.formatErrorSync(error),
            } as const satisfies RequestErrorResult_ParseError;
        }
    }

    // unhandled exception thrown
    if (Cause.isDieType(cause)) {
        return {
            type: 'defect',
            message: Cause.pretty(cause),
        } as const satisfies RequestErrorResult_Defect;
    }

    // other error
    return {
        type: 'other',
        message: 'Unknown error',
    } as const satisfies RequestErrorResult_Other;
};
