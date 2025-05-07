import { Schema } from "effect";
import type { FiltersDefinition } from "./filters-definition.js";

export const MultiselectStateValuesSchema = Schema.Array(Schema.Union(Schema.String, Schema.Number));
export const assertsMultiselectState: Schema.Schema.ToAsserts<typeof MultiselectStateValuesSchema> =
  Schema.asserts(MultiselectStateValuesSchema);
export const isMultiselectState = Schema.is(MultiselectStateValuesSchema);
export type MultiselectState = Schema.Schema.Type<typeof MultiselectStateValuesSchema>;
export const isEmptyMultiselectState = (state: MultiselectState) => state.length === 0;

export const TextStateValuesSchema = Schema.Union(Schema.String, Schema.Null);
export type TextState = Schema.Schema.Type<typeof TextStateValuesSchema>;
export const isTextState = Schema.is(TextStateValuesSchema);
export const assertTextState: Schema.Schema.ToAsserts<typeof TextStateValuesSchema> =
  Schema.asserts(TextStateValuesSchema);
export const isEmptyTextState = (state: TextState) => state === "" || state === null;

export const CheckboxStateValuesSchema = Schema.Union(Schema.Boolean, Schema.Null);
export type CheckboxState = Schema.Schema.Type<typeof CheckboxStateValuesSchema>;
export const isCheckboxState = Schema.is(CheckboxStateValuesSchema);
export const assertCheckboxState: Schema.Schema.ToAsserts<typeof CheckboxStateValuesSchema> =
  Schema.asserts(CheckboxStateValuesSchema);
export const isEmptyCheckboxState = (state: CheckboxState) => state === false || state === null;

export const SingleSelectToggleStateValuesSchema = Schema.Union(Schema.String, Schema.Null);
export type SingleSelectToggleState = Schema.Schema.Type<typeof SingleSelectToggleStateValuesSchema>;
export const isSingleSelectToggleState = Schema.is(SingleSelectToggleStateValuesSchema);
export const assertSingleSelectToggleState: Schema.Schema.ToAsserts<typeof SingleSelectToggleStateValuesSchema> =
  Schema.asserts(SingleSelectToggleStateValuesSchema);
export const isEmptySingleSelectToggleState = (state: SingleSelectToggleState) => state === "" || state === null;

export const FiltersStateValuesSchema = Schema.Union(
  TextStateValuesSchema,
  CheckboxStateValuesSchema,
  MultiselectStateValuesSchema,
  SingleSelectToggleStateValuesSchema,
  Schema.Null
);
export type FilterValues = FiltersDefinition[number]["input"]["defaultValue"];

export const FiltersStateSchema = Schema.Record({ key: Schema.String, value: FiltersStateValuesSchema });
export type FiltersState = Record<string, FilterValues>;
