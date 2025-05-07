/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from 'effect';

/**
 * Validate structural compatibility of a schema with a type.
 * Use this to validate that a encoded value of a schema is compatible with a type.
 * Meant to be used for API compatibility checks.
 * Use Schema.typeSchema() to extract the Type portion of a validated schema.
 *
 * @example
 * ```ts
 * const schema = Schema.Struct({ a: Schema.Number });
 *
 * // we need to use `Schema.typeSchema()` to extract the extract the Type portion of a schema.
 * // viz. https://effect.website/docs/schema/projections/#typeschema
 * const SchemaType = Schema.typeSchema(schema);
 *
 * validateSchema<{ a: number }>(SchemaType);
 * ```
 */
export const validateSchemaEncode = <T>(schema: Schema.Schema<any, T, any>) => null;

/**
 * Assert that a schema is compatible with a type.
 * Use `Schema.typeSchema()` to extract the Type portion of a validated schema.
 *
 * @example
 * ```ts
 * const schema = Schema.Struct({ a: Schema.Number });
 *
 * // we might need to use `Schema.typeSchema()` to extract the extract the Type portion of a schema.
 * // viz. https://effect.website/docs/schema/projections/#typeschema
 * const SchemaType = Schema.typeSchema(schema);
 *
 * assertSchemaTypeEquality<{ a: number }>(SchemaType);
 * ```
 */
export const validateSchema = <T>(schema: Schema.Schema<T>) => null;
