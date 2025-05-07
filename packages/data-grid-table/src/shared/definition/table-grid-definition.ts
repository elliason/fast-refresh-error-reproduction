import { createDefinitionSchema, type GridDefinition } from "@project/table/shared/lib/definition";
import { Schema } from "effect";
import { TableRenderingDefinitionSchema } from "./table-rendering-definition.js";
import { validateSchema } from "@project/request/shared/schema-validation";

export const TableSpecificDefinitionSchema = Schema.Struct({
  render: TableRenderingDefinitionSchema,
  type: Schema.String,
});
export type TableSpecificDefinition = Schema.Schema.Type<typeof TableSpecificDefinitionSchema>;

export const TableDefinitionSchema = createDefinitionSchema(TableSpecificDefinitionSchema);
export type TableGridDefinition = Schema.Schema.Type<typeof TableDefinitionSchema>;

/* export type TableGridDefinition = GridDefinition<TableSpecificDefinition>;

{
    validateSchema<TableGridDefinition>(TableDefinitionSchema);
}
 */
