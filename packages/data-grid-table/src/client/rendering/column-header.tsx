import { TriangleIcon } from "lucide-react";
import { type SortDirection } from "@project/table/sorting/shared/sorting-state";
import type { ColumnDefinition } from "../../shared/definition/table-rendering-definition.js";

export type ColumnHeaderProps = {
  column: ColumnDefinition;
  currentDirection?: SortDirection | null;
  onSort: (direction: SortDirection) => void;
};

export const ColumnHeader = ({ column, currentDirection = null, onSort }: ColumnHeaderProps) => {
  const handleSort = () => {
    const newDirection = (() => {
      if (currentDirection === "ASC") {
        return "DESC";
      }
      return "ASC";
    })();
    onSort(newDirection);
  };

  const isActive = currentDirection !== null;

  return (
    <>
      {column.sortable ? (
        <button
          className={`inline-flex cursor-pointer items-center gap-1 ${
            isActive ? "bg-border/40 rounded-full px-2 py-1" : ""
          }`}
          onClick={handleSort}
        >
          <span>{column.label}</span>
          <span className="relative ml-1 w-2">
            <TriangleIcon
              fill={isActive ? "text-active/80" : "none"}
              className={`absolute bottom-0 left-0 h-2 w-2 ${isActive ? "text-active/80" : "text-slate-300"}`}
              style={{
                transform: currentDirection === "ASC" ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </span>
        </button>
      ) : (
        <span className="inline-flex">{column.label}</span>
      )}
    </>
  );
};
