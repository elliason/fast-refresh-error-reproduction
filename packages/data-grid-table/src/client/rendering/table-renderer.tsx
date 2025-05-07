import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@project/ui/components/table";
import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import type { TableGridDefinition } from "../../shared/definition/table-grid-definition.js";
import { TablePagination } from "./table-pagination.js";
import { NoData } from "./no-data.js";

export const TableRenderer = ({
  table,
  isFetching,
  showPagination = true,
  paginationSizeOptions = [10, 20, 50, 100],
}: {
  table: ReactTable<any>;
  isFetching: boolean;
  showPagination?: boolean;
  paginationSizeOptions?: ReadonlyArray<number>;
}) => {
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {(() => {
            const rows = table.getRowModel().rows;

            if (rows.length === 0 && !isFetching) {
              return (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <NoData title="No data" description="No data found" />
                  </TableCell>
                </TableRow>
              );
            }

            return rows.map((row) => (
              <TableRow className="hover:bg-transparent" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} variant="pure">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
      {showPagination && (
        <TablePagination table={table} definitionSizeOptions={paginationSizeOptions} isDisabled={isFetching} />
      )}
    </>
  );
};
