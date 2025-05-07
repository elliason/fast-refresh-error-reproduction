import { Data, Schema } from 'effect';

/** @description Contains additional details of the error in addition to the HTTP status code */
export const ErrorResponseDTOSchema = Schema.Struct({
    /** @description The translated error message shown to user. */
    errorMessage: Schema.String,
});
export type ErrorResponseDTO = Schema.Schema.Type<typeof ErrorResponseDTOSchema>;

/** @description Validation error for specific form field. */
export const FieldErrorDTOSchema = Schema.Struct({
    /** @description Name of the field that is invalid. */
    fieldName: Schema.String,
    /** @description Translated error message for the field that can be showed to the user. */
    errorMessage: Schema.String,
});
export type FieldErrorDTO = Schema.Schema.Type<typeof FieldErrorDTOSchema>;

/** @description Validation errors with list of field errors. Should be used only with 400 HTTP status. */
export const BadRequestResponseDTOSchema = Schema.Struct({
    /** @description The translated error message shown to user. */
    errorMessage: Schema.String,
    /** @description Technical details of the error. Does not contain any sensitive information, but is not properly translated or formatted and thus should not be shown to user. This information is meant only for programmer that implements client side of the API. */
    technicalDetails: Schema.String,
    /** @description List of field errors describing which fields are invalid and why. */
    fieldErrors: Schema.Array(FieldErrorDTOSchema),
});
export type BadRequestResponseDTO = Schema.Schema.Type<typeof BadRequestResponseDTOSchema>;

export class ServerError extends Data.TaggedError('ServerError')<{
    error: ErrorResponseDTO | BadRequestResponseDTO | FieldErrorDTO;
    response: Response;
}> {}
