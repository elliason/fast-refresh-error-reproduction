import { Button } from "@project/ui/components/button";
import type { LinkContent as LinkContentType } from "../../../shared/data/link-content.js";
import { CellContent } from "../cell-content.js";
import { isLinkAction } from "../../../shared/data/link-action.js";
import type { CellContentRenderers } from "../../../shared/table-grid-props.js";
import type { ColumnDefinition } from "../../../shared/definition/table-rendering-definition.js";

export const LinkContent = ({
  content,
  renderers,
  column,
}: {
  content: LinkContentType;
  renderers?: CellContentRenderers | undefined;
  column: ColumnDefinition;
}) => {
  if (isLinkAction(content.action)) {
    return (
      <>
        <a href={content.action.url}>
          <CellContent content={content.content} renderers={renderers} column={column} />
        </a>
      </>
    );
  }
};
