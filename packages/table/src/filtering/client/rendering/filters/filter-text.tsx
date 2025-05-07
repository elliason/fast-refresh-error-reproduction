import { Label } from "@project/ui/components/label";
import { Input } from "@project/ui/components/input";
import { type TextFilterDefinition } from "../../../shared/filters-definition.js";
import { useEffect, useState } from "react";
import React from "react";
import type { TextFilterComponent } from "../../../shared/filter-renderers.js";

function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const FilterText: TextFilterComponent = ({
  definition,
  state,
  setState,
}: {
  definition: TextFilterDefinition;
  state: string | null;
  setState: (state: string | null, preservePagination?: boolean) => void;
}) => {
  const [value, setValue] = useState(state ?? "");
  const debouncedInput = useDebounce(value, 500);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const newValue = debouncedInput?.trim() === "" ? null : debouncedInput;
    if (debouncedInput === null) return;
    setState(newValue, isFirstRender);
  }, [debouncedInput]);

  useEffect(() => {
    if (debouncedInput?.trim() !== state) {
      setValue(state ?? "");
    }
  }, [state]);

  return (
    <div className="grid-filter-text">
      <Label>{definition.label}</Label>
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};
