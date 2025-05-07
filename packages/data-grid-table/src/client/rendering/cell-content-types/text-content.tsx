import type { CellContentTextComponent } from '../../../shared/table-grid-props.js';
import type { TextContent as TextContentType } from '../../../shared/data/text-content.js';
import type { ColumnDefinition } from '../../../shared/definition/table-rendering-definition.js';

export const TextContent: CellContentTextComponent = ({
    content,
    column,
}: {
    content: TextContentType;
    column: ColumnDefinition;
}) => <span>{content.text}</span>;
