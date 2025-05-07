import type { IconContent as IconContentType } from '../../../shared/data/icon-content.js';
import type { CellContentIconComponent } from '../../../shared/table-grid-props.js';
import type { ColumnDefinition } from '../../../shared/definition/table-rendering-definition.js';

const IconContent: CellContentIconComponent = ({
    content,
    column,
}: {
    content: IconContentType;
    column: ColumnDefinition;
}) => <span>{content.icon}</span>;

export default IconContent;
