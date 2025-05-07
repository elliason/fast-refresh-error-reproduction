import { Schema } from "effect";
import { BackendActionSchema } from "@project/table/actions/shared/actions-definition";

export { BackendActionSchema };
export const isBackendAction = Schema.is(BackendActionSchema);
export type BackendAction = Schema.Schema.Type<typeof BackendActionSchema>;

export const RouteActionSchema = Schema.Struct({
  name: Schema.NullOr(Schema.String),
  params: Schema.NullOr(Schema.Record({ key: Schema.String, value: Schema.String })),
  type: Schema.Literal("ROUTE_ACTION"),
});
export type RouteAction = Schema.Schema.Type<typeof RouteActionSchema>;

export const LinkActionSchema = Schema.Struct({
  url: Schema.String,
  type: Schema.Literal("LINK_ACTION"),
});
export type LinkAction = Schema.Schema.Type<typeof LinkActionSchema>;
