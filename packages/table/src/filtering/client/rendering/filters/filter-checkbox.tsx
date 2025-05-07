import { Checkbox } from "@project/ui/components/checkbox";
import { Label } from "@project/ui/components/label";
import type { CheckboxFilterDefinition } from "../../../shared/filters-definition.js";
import type { CheckboxFilterComponent } from "../../../shared/filter-renderers.js";

export const FilterCheckbox: CheckboxFilterComponent = ({
  definition,
  state,
  setState,
}: {
  definition: CheckboxFilterDefinition;
  state: boolean | null;
  setState: (state: boolean | null) => void;
}) => {
  return (
    <div className="grid-filter-checkbox">
      <Label>{definition.label}</Label>
      <Checkbox
        checked={state ?? false}
        onCheckedChange={(checked) => {
          if (typeof checked === "boolean") {
            setState(checked);
          }
        }}
      />
    </div>
  );
};
