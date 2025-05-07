import * as React from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@project/ui/components/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@project/ui/components/select";
import { cn } from "@project/ui/lib/utils";
import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { TablePaginationButton } from "./table-pagination-button.js";

type TablePaginationProps<RowData> = {
  table: Table<RowData>;
  definitionSizeOptions: ReadonlyArray<number>;
  isDisabled?: boolean;
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const TablePagination = <RowData,>({
  table,
  definitionSizeOptions,
  isDisabled = false,
}: TablePaginationProps<RowData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPageCount = table.getPageCount();
  const siblingsCount = 2;

  // Count for left and right siblings
  const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPageCount);

  // Determine if we should show ellipsis
  const shouldShowLeftDots = leftSiblingIndex > 1;
  const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 1;

  // Create an array of page numbers to display in pagination
  const totalPaginationRange = range(leftSiblingIndex, rightSiblingIndex);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-4 lg:flex-row",
        isDisabled && "pointer-events-none"
      )}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <TablePaginationButton
              isDisabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
              aria-label="Přejít na první stranu"
            >
              <ChevronsLeftIcon className="size-6" />
              <span className="sr-only">{`První`}</span>
            </TablePaginationButton>
          </PaginationItem>
          <PaginationItem>
            <TablePaginationButton
              isDisabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              aria-label="Přejít na první stranu"
            >
              <ChevronLeft className="size-6" />
              <span className="sr-only">{`Předchozí`}</span>
            </TablePaginationButton>
          </PaginationItem>
          {shouldShowLeftDots && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalPaginationRange.map((page) => (
            <PaginationItem key={page}>
              {currentPage === page ? (
                <TablePaginationButton isActive>{page}</TablePaginationButton>
              ) : (
                <TablePaginationButton onClick={() => table.setPageIndex(page - 1)}>{page}</TablePaginationButton>
              )}
            </PaginationItem>
          ))}
          {shouldShowRightDots && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <TablePaginationButton isDisabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
              <ChevronRight className="size-6" />
              <span className="sr-only">{`Další`}</span>
            </TablePaginationButton>
          </PaginationItem>
          <PaginationItem>
            <TablePaginationButton
              isDisabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
              aria-label="Přejít na poslední stranu"
            >
              <ChevronsRightIcon className="size-6" />
              <span className="sr-only">{`Poslední`}</span>
            </TablePaginationButton>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {definitionSizeOptions.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-right text-sm">Počet položek na stránce</span>
          <Select
            defaultValue={table.getState().pagination.pageSize.toString()}
            onValueChange={(size) => table.setPageSize(parseInt(size))}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder={"Zvolit velikost stránky"} />
            </SelectTrigger>
            <SelectContent>
              {[...definitionSizeOptions]
                .sort((a, b) => a - b)
                .map((size) => (
                  <SelectItem value={size.toString()} key={size}>
                    {size}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
