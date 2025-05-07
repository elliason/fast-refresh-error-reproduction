import type { TextFilterDefinition } from "../../../shared/filters-definition.js";
import { Badge } from "@project/ui/components/badge";
import { X as RemoveIcon } from "lucide-react";

export const FilterTextOverview = ({
  definition,
  state,
  setState,
}: {
  definition: TextFilterDefinition;
  state: string;
  setState: (state: string | null) => void;
}) => {
  return (
    <Badge key={definition.name} onClick={() => setState(null)}>
      {`${definition.label}: ${state}`}
      <RemoveIcon />
    </Badge>
  );
};
