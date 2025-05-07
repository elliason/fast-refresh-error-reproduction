import type { GridDefinition } from "../../shared/lib/definition.js";
import { useLocalState } from "../hooks/use-local-state.js";
import { GridStateProvider } from "../state/state-context.js";
import type { GridState, GridStateManagerReturn } from "../state/state.js";
import type { StateProvider } from "./state-provider.js";

export const LocalStateProvider: StateProvider<GridState, GridDefinition> = ({
  definition,
  children,
}: {
  definition: GridDefinition;
  children: (state: GridStateManagerReturn) => React.ReactNode;
}) => {
  const state = useLocalState({ definition });
  return <GridStateProvider value={state}>{children(state)}</GridStateProvider>;
};
