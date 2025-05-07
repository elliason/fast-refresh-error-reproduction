import { Schema } from 'effect';

export const RouteActionSchema = Schema.Struct({
    name: Schema.NullOr(Schema.String),
    params: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.String })),
    type: Schema.Literal('ROUTE_ACTION'),
});
export const isRouteAction = Schema.is(RouteActionSchema);
export type RouteAction = Schema.Schema.Type<typeof RouteActionSchema>;
