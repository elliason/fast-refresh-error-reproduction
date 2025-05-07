import IconContent from './cell-content-types/icon-content.js';
import { TextContent } from './cell-content-types/text-content.js';
import type { CellContentRenderers } from '../../shared/table-grid-props.js';
import { ButtonContent } from './cell-content-types/button-content.js';
import { CollectionContent } from './cell-content-types/collection-content.js';
import { InlineListContent } from './cell-content-types/inline-list-content.js';
import type { Cell } from '../../shared/data/cell.js';
import { isButtonContent } from '../../shared/data/button-content.js';
import { isIconContent } from '../../shared/data/icon-content.js';
import { isInlineCollectionContent } from '../../shared/data/inline-collection-content.js';
import { isInlineListContent } from '../../shared/data/inline-list-content.js';
import { isListContent } from '../../shared/data/list-content.js';
import { ListContent } from './cell-content-types/list-content.js';
import { isLinkContent } from '../../shared/data/link-content.js';
import { LinkContent } from './cell-content-types/link-content.js';
import { isTextContent } from '../../shared/data/text-content.js';
import { isRouteAction } from '../../shared/data/route-action.js';
import { isBackendAction } from '../../shared/data/actions.js';
import type { ColumnDefinition } from '../../shared/definition/table-rendering-definition.js';
import type { CellContentComponent } from '../../shared/table-grid-props.js';

export const CellContent: CellContentComponent = ({
    content,
    renderers,
    column,
}: {
    content: Cell['content'] | undefined;
    renderers?: CellContentRenderers | undefined;
    column: ColumnDefinition;
}) => {
    if (!content) return null;
    if (typeof content === 'string') return content;

    return (
        <>
            {(() => {
                if (isButtonContent(content)) {
                    if (renderers?.Button) {
                        return <renderers.Button content={content} renderers={renderers} column={column} />;
                    }
                    return <ButtonContent content={content} renderers={renderers} column={column} />;
                }

                if (isIconContent(content)) {
                    if (renderers?.Icon) {
                        return <renderers.Icon content={content} column={column} />;
                    }
                    return <IconContent content={content} column={column} />;
                }

                if (isInlineCollectionContent(content)) {
                    if (renderers?.InlineCollection) {
                        return <renderers.InlineCollection content={content} renderers={renderers} column={column} />;
                    }
                    return <CollectionContent content={content} renderers={renderers} column={column} />;
                }

                if (isInlineListContent(content)) {
                    if (renderers?.InlineList) {
                        return <renderers.InlineList content={content} renderers={renderers} column={column} />;
                    }
                    return <InlineListContent content={content} renderers={renderers} column={column} />;
                }

                if (isListContent(content)) {
                    if (renderers?.List) {
                        return <renderers.List content={content} renderers={renderers} column={column} />;
                    }
                    return <ListContent content={content} renderers={renderers} column={column} />;
                }

                if (isLinkContent(content)) {
                    if (renderers?.Link) {
                        return <renderers.Link content={content} renderers={renderers} column={column} />;
                    }
                    return <LinkContent content={content} renderers={renderers} column={column} />;
                }

                if (isTextContent(content)) {
                    if (renderers?.Text) {
                        return <renderers.Text content={content} column={column} />;
                    }
                    return <TextContent content={content} column={column} />;
                }

                if (isRouteAction(content)) {
                    if (renderers?.RouteAction) {
                        return <renderers.RouteAction content={content} renderers={renderers} column={column} />;
                    }
                    return 'ROUTE ACTION NOT IMPLEMENTED';
                }

                if (isBackendAction(content)) {
                    if (renderers?.BackendAction) {
                        return <renderers.BackendAction content={content} renderers={renderers} column={column} />;
                    }
                    return 'BACKEND ACTION NOT IMPLEMENTED';
                }
            })()}
        </>
    );
};
