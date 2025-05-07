import { Label } from "@project/ui/components/label";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectInput,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
} from "@project/ui/components/multi-select";
import { type MultiselectFilterDefinition } from "../../../shared/filters-definition.js";
import type { MultiselectFilterComponent, MultiselectGridFilterOptions } from "../../../shared/filter-renderers.js";

export const FilterMultiselect: MultiselectFilterComponent = ({
  state,
  setState,
  definition,
  placeholder,
  searchPlaceholder,
}: {
  definition: MultiselectFilterDefinition;
  state: readonly (string | number)[];
  setState: (state: readonly (string | number)[]) => void;
} & MultiselectGridFilterOptions) => {
  const options = definition.input.options.map((option) => ({
    value: String(option.value),
    label: String(option.label),
  }));
  const values = state.map((val) => `${val}`);

  return (
    <div className="grid-filter-multiselect">
      <Label>{definition.label}</Label>
      <MultiSelect
        onValuesChange={(value) => {
          setState(value);
        }}
        values={values}
        translatedValues={options}
      >
        <MultiSelectTrigger>
          <MultiSelectInput placeholder={placeholder} searchPlaceholder={searchPlaceholder} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectList>
            {options.map((option) => {
              if (option.value)
                return (
                  <MultiSelectItem key={option.value} value={option.value?.toString()}>
                    {option.label}
                  </MultiSelectItem>
                );
            })}
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  );
};
