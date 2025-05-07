import type { GridDefinition } from "../../shared/lib/definition.js";
import type { GridID } from "../../shared/lib/grid-id.js";
import { useUrlState } from "../hooks/use-url-state.js";
import { GridStateProvider } from "../state/state-context.js";
import type { StateProvider } from "./state-provider.js";
import type { GridState, GridStateManagerReturn } from "../state/state.js";

export const URLStateProvider: StateProvider<GridState, GridDefinition> = ({
  definition,
  id,
  children,
}: {
  definition: GridDefinition;
  id: GridID;
  children: (state: GridStateManagerReturn) => React.ReactNode;
}) => {
  const state = useUrlState({ definition, id });
  return <GridStateProvider value={state}>{children(state)}</GridStateProvider>;
};
