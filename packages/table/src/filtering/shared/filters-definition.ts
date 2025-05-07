import { Schema } from 'effect';

export const TextFilterDefinitionSchema = Schema.Struct({
    name: Schema.String,
    label: Schema.String,
    input: Schema.Struct({
        visibility: Schema.optional(Schema.Literal('ALWAYS', 'MINIFIED', 'EXPANDED')),
        defaultValue: Schema.NullOr(Schema.String),
        type: Schema.Literal('TEXT'),
    }),
    type: Schema.Literal('FILTER'),
});
export type TextFilterDefinition = Schema.Schema.Type<typeof TextFilterDefinitionSchema>;
export const assertTextFilterDefinition: Schema.Schema.ToAsserts<typeof TextFilterDefinitionSchema> =
    Schema.asserts(TextFilterDefinitionSchema);
export const isTextFilterDefinition = Schema.is(TextFilterDefinitionSchema);
export const CheckboxFilterDefinitionSchema = Schema.Struct({
    name: Schema.String,
    label: Schema.String,
    input: Schema.Struct({
        defaultValue: Schema.NullOr(Schema.Boolean),
        type: Schema.Literal('CHECKBOX'),
    }),
    type: Schema.Literal('FILTER'),
});
export type CheckboxFilterDefinition = Schema.Schema.Type<typeof CheckboxFilterDefinitionSchema>;
export const assertCheckboxFilterDefinition: Schema.Schema.ToAsserts<typeof CheckboxFilterDefinitionSchema> =
    Schema.asserts(CheckboxFilterDefinitionSchema);
export const isCheckboxFilterDefinition = Schema.is(CheckboxFilterDefinitionSchema);

export const OptionSchema = Schema.Struct({
    value: Schema.Union(Schema.String, Schema.Number),
    label: Schema.String,
});

export const MultiselectFilterDefinitionSchema = Schema.Struct({
    name: Schema.String,
    label: Schema.String,
    input: Schema.Struct({
        visibility: Schema.optional(Schema.Literal('ALWAYS', 'MINIFIED', 'EXPANDED')),
        defaultValue: Schema.NullOr(Schema.Array(Schema.Union(Schema.String, Schema.Number))),
        options: Schema.Array(OptionSchema),
        type: Schema.Literal('MULTISELECT'),
    }),
    type: Schema.Literal('FILTER'),
});
export type MultiselectFilterDefinition = Schema.Schema.Type<typeof MultiselectFilterDefinitionSchema>;
export const assertMultiselectDefinition: Schema.Schema.ToAsserts<typeof MultiselectFilterDefinitionSchema> =
    Schema.asserts(MultiselectFilterDefinitionSchema);
export const isMultiselectFilterDefinition = Schema.is(MultiselectFilterDefinitionSchema);

export const SingleSelectToggleFilterDefinitionSchema = Schema.Struct({
    name: Schema.String,
    label: Schema.String,
    input: Schema.Struct({
        defaultValue: Schema.NullOr(Schema.String),
        options: Schema.Array(OptionSchema),
        type: Schema.Literal('SINGLESELECT_TOGGLE'),
    }),
    type: Schema.Literal('FILTER'),
});
export type SingleSelectToggleFilterDefinition = Schema.Schema.Type<typeof SingleSelectToggleFilterDefinitionSchema>;
export const isSingleSelectToggleFilterDefinition = Schema.is(SingleSelectToggleFilterDefinitionSchema);

export const FiltersDefinitionSchema = Schema.Array(
    Schema.Union(
        TextFilterDefinitionSchema,
        MultiselectFilterDefinitionSchema,
        CheckboxFilterDefinitionSchema,
        SingleSelectToggleFilterDefinitionSchema
    )
);

export type FiltersDefinition = Schema.Schema.Type<typeof FiltersDefinitionSchema>;
