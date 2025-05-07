import { createContext, useContext } from "react";
import type { GridStateManagerReturn } from "./state.js";

const GridStateContext = createContext<GridStateManagerReturn | null>(null);

export const GridStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GridStateManagerReturn;
}) => {
  return <GridStateContext.Provider value={value}>{children}</GridStateContext.Provider>;
};

export const useGridState = () => {
  const context = useContext(GridStateContext);

  if (!context) {
    throw new Error("useGridState must be used within a GridStateProvider");
  }

  return context;
};
