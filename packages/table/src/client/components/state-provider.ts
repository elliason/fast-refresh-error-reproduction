import type React from "react";
import type { GridDefinition } from "../../shared/lib/definition.js";
import type { GridID } from "../../shared/lib/grid-id.js";
import type { GridState, GridStateManagerReturn } from "../state/state.js";

export type StateProvider<State extends GridState, Definition extends GridDefinition> = React.ComponentType<{
  definition: Definition;
  id: GridID;
  children: (state: GridStateManagerReturn) => React.ReactNode;
}>;
