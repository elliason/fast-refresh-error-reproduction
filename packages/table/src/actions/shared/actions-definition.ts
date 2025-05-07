/* import { Schema } from 'effect';
import { FiltersRequestSchema } from '../../filtering/shared/filters-request';
import { SortingRequestSchema } from '../../sorting/shared/sorting-request';
import { PaginationRequestSchema } from '../../pagination/shared/pagination-request';

const SendSelectedRowsSchema = Schema.Struct({
    rowIdentifierKey: Schema.String,
    placement: Schema.Literal('QUERY', 'BODY'),
    parameterName: Schema.String,
});

const BackendGlobalActionDTOSchema = Schema.Struct({
    sendFilters: Schema.NullOr(FiltersRequestSchema),
    sendSort: Schema.NullOr(SortingRequestSchema),
    sendPage: Schema.NullOr(PaginationRequestSchema),
    sendSelectedRows: Schema.NullOr(SendSelectedRowsSchema),
    method: Schema.Literal('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
    url: Schema.String,
    type: Schema.Literal('BACKEND_GLOBAL_ACTION'),
});

const LinkGlobalActionDTOSchema = Schema.Struct({
    sendFilters: Schema.NullOr(FiltersRequestSchema),
    sendSort: Schema.NullOr(SortingRequestSchema),
    sendPage: Schema.NullOr(PaginationRequestSchema),
    sendSelectedRows: Schema.NullOr(SendSelectedRowsSchema),
    url: Schema.String,
    type: Schema.Literal('LINK_GLOBAL_ACTION'),
});

const GlobalButtonSchema = Schema.Struct({
    label: Schema.String,
    icon: Schema.NullOr(Schema.String),
    action: Schema.Union(LinkGlobalActionDTOSchema, BackendGlobalActionDTOSchema),
}); */

import { Schema } from 'effect';

export const BackendActionSchema = Schema.Struct({
    url: Schema.String,
    method: Schema.Literal('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
    body: Schema.Record({
        key: Schema.String,
        value: Schema.Union(Schema.String, Schema.Number, Schema.Boolean),
    }),
    type: Schema.Literal('BACKEND_ACTION'),
});
