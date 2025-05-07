import { Badge } from "@project/ui/components/badge";
import { X as RemoveIcon } from "lucide-react";
import type { MultiselectFilterDefinition } from "../../../shared/filters-definition.js";

export const FilterMultiselectOverview = ({
  state,
  definition,
  setState,
}: {
  definition: MultiselectFilterDefinition;
  state: readonly (string | number)[];
  setState: (state: readonly (string | number)[]) => void;
}) => {
  if (state.length === 0) return null;

  return state.map((val, i) => (
    <Badge
      variant="muted"
      className="gap-1 font-normal normal-case"
      key={`${definition.name}-${i}`}
      onClick={() => setState(state.filter((v) => v !== val))}
    >
      {`${definition.label}`}:{" "}
      <span className="font-medium">{`${
        definition.input.options.find((o) => String(o.value) === String(val))?.label
      }`}</span>
      <RemoveIcon className="size-4" />
    </Badge>
  ));
};
