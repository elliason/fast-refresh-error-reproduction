import { Label } from "@project/ui/components/label";
import { type SingleSelectToggleFilterDefinition } from "../../../shared/filters-definition.js";
import { Badge } from "@project/ui/components/badge";
import { X as RemoveIcon } from "lucide-react";

export const FilterSingleSelectOverview = ({
  definition,
  state,
  setState,
}: {
  definition: SingleSelectToggleFilterDefinition;
  state: string | null;
  setState: (state: string | null) => void;
}) => {
  return (
    <Badge key={definition.name} onClick={() => setState(null)}>
      {`${definition.label}:`}
      <span className="font-medium">{`${
        definition.input.options.find((o) => String(o.value) === String(state))?.label
      }`}</span>
      <RemoveIcon />
    </Badge>
  );
};
