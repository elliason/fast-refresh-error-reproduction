import { Badge } from "@project/ui/components/badge";
import type { CheckboxFilterDefinition } from "../../../shared/filters-definition.js";
import { X as RemoveIcon } from "lucide-react";

export const FilterCheckboxOverview = ({
  state,
  definition,
  setState,
}: {
  state: boolean;
  definition: CheckboxFilterDefinition;
  setState: (state: boolean) => void;
}) => {
  return (
    <Badge key={definition.name} onClick={() => setState(false)}>
      {definition.label}
      <RemoveIcon />
    </Badge>
  );
};
