import React from 'react';
import type { InlineCollectionContent } from '../../../shared/data/inline-collection-content.js';
import { CellContent } from '../cell-content.js';
import type { CellContentRenderers } from '../../../shared/table-grid-props.js';
import type { ColumnDefinition } from '../../../shared/definition/table-rendering-definition.js';

export const CollectionContent = ({
    content,
    renderers,
    column,
}: {
    content: InlineCollectionContent;
    renderers?: CellContentRenderers | undefined;
    column: ColumnDefinition;
}) => {
    return (
        <div>
            {content.contents.map((content, index) => {
                return (
                    <React.Fragment key={index}>
                        <CellContent content={content} renderers={renderers} column={column} />
                    </React.Fragment>
                );
            })}
        </div>
    );
};
