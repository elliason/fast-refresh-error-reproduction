import { Label } from "@project/ui/components/label";
import { type SingleSelectToggleFilterDefinition } from "../../../shared/filters-definition.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@project/ui/components/select";

export const FilterSingleSelect = ({
  definition,
  state,
  setState,
}: {
  definition: SingleSelectToggleFilterDefinition;
  state: string | null;
  setState: (state: string | null) => void;
}) => {
  return (
    <div className="grid-filter-multiselect">
      <Label>{definition.label}</Label>
      <Select onValueChange={(value) => setState(value)} value={state ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder={"Vyberte"} />
        </SelectTrigger>
        <SelectContent>
          {definition.input.options.map((option) => (
            <SelectItem key={option.value} value={`${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
