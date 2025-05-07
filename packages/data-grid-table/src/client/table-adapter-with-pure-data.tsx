import type { TableGridDefinition } from "../shared/definition/table-grid-definition.js";
import type { ColumnDef } from "@tanstack/react-table";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { ColumnHeader } from "./rendering/column-header.js";
import {
  type GridTableDataTypeWithCountableOffsetPaging,
  type GridTableDataTypeWithOffsetPaging,
} from "../shared/data/data-schema.js";
import { type Row } from "../shared/data/row.js";
import { CellContent } from "./rendering/cell-content.js";
import { TableRenderer } from "./rendering/table-renderer.js";
import type { CellContentComponent, TableGridProps } from "../shared/table-grid-props.js";
import { cn } from "@project/ui/lib/utils";
import type { GridStateManagerReturn } from "@project/table/client/state/state";
import type { DeepMutable } from "effect/Types";

/**
 * Meant to be used without whole query object, only with pure data as query result
 */
export const TableAdapterWithPureData = <
  DataType extends GridTableDataTypeWithCountableOffsetPaging | GridTableDataTypeWithOffsetPaging
>({
  data,
  isFetching,
  definition,
  debug = false,
  renderers,
  classNameModifiers,
  state,
}: {
  data: DataType;
  isFetching: boolean;
  definition: TableGridDefinition;
  debug?: boolean;
  renderers?: TableGridProps["renderers"];
  classNameModifiers?: TableGridProps["classNameModifiers"];
  state: GridStateManagerReturn;
}) => {
  const { filtersState, sortingState, paginationState, setFiltersState, setSortingState, setPaginationState } = state;

  const { ColumnHeader: ColumnHeaderRenderer = ColumnHeader } = renderers ?? {};

  const columnsDef: ColumnDef<Row>[] = definition.render.columns.map((column) => {
    return {
      accessorKey: column.name,
      header: () => (
        <ColumnHeaderRenderer
          column={column}
          currentDirection={sortingState && sortingState.columnName === column.name ? sortingState.columnOrder : null}
          onSort={(direction) => setSortingState({ columnName: column.name, columnOrder: direction })}
        />
      ),
      cell: ({ row }) => {
        const contentType = (() => {
          if (typeof row.original.cells[column.name]?.content === "string") {
            return "TEXT";
          }

          // @ts-expect-error not sure why this should be bad
          return row.original.cells[column.name]?.content?.type;
        })();

        const CellContentRenderer = (() => {
          if (renderers?.["cell-content-by-column-name"]?.[column.name]) {
            return renderers["cell-content-by-column-name"][column.name] as CellContentComponent;
          }

          if (renderers?.["cell-content-by-content-type"]?.[contentType]) {
            return renderers["cell-content-by-content-type"][contentType] as CellContentComponent;
          }

          if (renderers?.CellContent) {
            return renderers.CellContent;
          }

          return CellContent;
        })();

        return (
          <div
            data-content-type={contentType}
            data-column-name={column.name ?? ""}
            className={cn(
              "break-words px-3 py-2 align-middle [&:has([role=checkbox])]:pr-0",
              classNameModifiers?.CellContentWrapper,
              classNameModifiers?.["cell-content-wrapper-by-column-name"]?.[column.name ?? ""],
              classNameModifiers?.["cell-content-wrapper-by-content-type"]?.[contentType ?? ""]
            )}
          >
            <CellContentRenderer
              content={row.original.cells[column.name]?.content}
              renderers={renderers?.["content-renderers"]}
              column={column}
            />
          </div>
        );
      },
    };
  });

  const table = useReactTable({
    columns: columnsDef,
    data: (data.items as DeepMutable<Row>[]) ?? [],
    rowCount: data.paging?.type === "COUNTABLE_OFFSET" ? data.paging.totalItems ?? undefined : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    debugTable: debug,
    state: {
      pagination: paginationState ?? undefined,
    },
    onPaginationChange: (updater) => {
      if (paginationState && typeof updater === "function") {
        const nextState = updater(paginationState);
        setPaginationState(nextState);

        return;
      }
    },
  });

  return (
    <TableRenderer
      table={table}
      isFetching={isFetching}
      showPagination={Boolean(definition.paging) && data.paging?.type === "COUNTABLE_OFFSET"}
      paginationSizeOptions={definition.paging?.sizeOptions}
    />
  );
};
