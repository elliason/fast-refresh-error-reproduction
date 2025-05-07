import type { InlineListContent as InlineListContentType } from '../../../shared/data/inline-list-content.js';
import { CellContent } from '../cell-content.js';
import type { CellContentRenderers } from '../../../shared/table-grid-props.js';
import type { ColumnDefinition } from '../../../shared/definition/table-rendering-definition.js';

export const InlineListContent = ({
    content,
    renderers,
    column,
}: {
    content: InlineListContentType;
    renderers?: CellContentRenderers | undefined;
    column: ColumnDefinition;
}) => {
    return (
        <ul className="flex flex-row gap-1 flex-wrap">
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
