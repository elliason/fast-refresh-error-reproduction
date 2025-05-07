import React from "react";
import type {
  CheckboxFilterDefinition,
  FiltersDefinition,
  MultiselectFilterDefinition,
  SingleSelectToggleFilterDefinition,
  TextFilterDefinition,
} from "./filters-definition.js";
import type { FiltersState } from "./filters-state.js";
import type { SetFiltersState } from "../../client/state/state.js";

export type CheckboxFilterComponent = React.ComponentType<{
  definition: CheckboxFilterDefinition;
  state: boolean | null;
  setState: (state: boolean | null) => void;
}>;

export type TextFilterComponent = React.ComponentType<{
  definition: TextFilterDefinition;
  state: string | null;
  setState: (state: string | null, preservePagination?: boolean) => void;
}>;

export interface MultiselectGridFilterOptions {
  placeholder?: string;
  searchPlaceholder?: string;
}

export type MultiselectFilterComponent = React.ComponentType<
  {
    definition: MultiselectFilterDefinition;
    state: readonly (string | number)[];
    setState: (state: readonly (string | number)[]) => void;
  } & MultiselectGridFilterOptions
>;

export type SingleSelectToggleFilterComponent = React.ComponentType<{
  definition: SingleSelectToggleFilterDefinition;
  state: string | null;
  setState: (state: string | null) => void;
}>;

export type FilterOverviewComponent = React.ComponentType<{
  filtersDefinition: FiltersDefinition;
  filtersState: FiltersState | null;
  setFiltersState: SetFiltersState;
}>;

export type FilterRenderers = {
  FilterTitle?: React.ComponentType;
  CheckboxFilter?: CheckboxFilterComponent;
  TextFilter?: TextFilterComponent;
  MultiselectFilter?: MultiselectFilterComponent;
  SingleSelectToggleFilter?: SingleSelectToggleFilterComponent;
  FilterOverview?: FilterOverviewComponent;
};

export type CustomFilterRendererProps = {
  definition: FiltersDefinition[number];
  state: FiltersState[string];
  setState: (state: boolean | null | string | readonly (string | number)[], preservePagination?: boolean) => void;
};

export type RenderersByFilterName = Record<string, React.ComponentType<CustomFilterRendererProps>>;
