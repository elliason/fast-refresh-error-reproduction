import { Button } from "@project/ui/components/button";
import type { ButtonContent as ButtonContentType } from "../../../shared/data/button-content.js";
import { CellContent } from "../cell-content.js";
import type { CellContentRenderers } from "../../../shared/table-grid-props.js";
import type { ColumnDefinition } from "../../../shared/definition/table-rendering-definition.js";

export const ButtonContent = ({
  content,
  renderers,
  column,
}: {
  content: ButtonContentType;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}) => (
  <>
    <Button type="button" variant="default">
      <CellContent content={content.content} renderers={renderers} column={column} />
    </Button>
  </>
);
