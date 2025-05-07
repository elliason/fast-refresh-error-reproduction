import type { ListContent as ListContentType } from '../../../shared/data/list-content.js';
import { CellContent } from '../cell-content.js';
import type { CellContentRenderers } from '../../../shared/table-grid-props.js';
import type { ColumnDefinition } from '../../../shared/definition/table-rendering-definition.js';

export const ListContent = ({
    content,
    renderers,
    column,
}: {
    content: ListContentType;
    renderers?: CellContentRenderers | undefined;
    column: ColumnDefinition;
}) => {
    return (
        <ul>
            {content.contents.map((content, index) => {
                return (
                    <li key={index}>
                        <CellContent content={content} renderers={renderers} column={column} />
                    </li>
                );
            })}
        </ul>
    );
};
