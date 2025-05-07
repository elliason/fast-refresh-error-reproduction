import type { RequestErrorResult } from "@project/request/shared/error-result";
import type { GridDefinition, SpecificDefinitionType } from "./definition.js";
import { type RequestResult } from "@project/request/shared/request-result";

export interface GetDefinitionOptions {
  debug?: boolean;
  id?: string;
}

export type DefinitionLoader<
  DefinitionType extends GridDefinition<SpecificDefinitionType>,
  Error = RequestErrorResult
> = (options: GetDefinitionOptions) => Promise<RequestResult<DefinitionType, Error>>;
