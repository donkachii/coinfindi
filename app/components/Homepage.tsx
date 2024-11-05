"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CoinsData } from "@/types";
import { ColumnsCoinFN } from "./table";

interface Coins {
  CoinsData: CoinsData[];
}

const Homepage = () => {
  const [tableData, setTableData] = useState<CoinsData[]>([]);
  const [globalFilter, setGlobalFilter] = useState<any>("");
  const [pageIndex, setPageIndex] = useState(0); // Starts from 0
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const fetchCoins = useCallback(async () => {
    setIsLoading(true);
    try {
      const start = pageIndex * pageSize;
      const limit = pageSize;
      const response = await axios.get(
        `https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`
      );
      setTableData(response.data.data);
      const totalCount = response.data.info.coins_num; // Adjust based on API response
      setTotalPages(Math.ceil(totalCount / pageSize));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [pageIndex, pageSize]);

  useEffect(() => {
    fetchCoins();
  }, [pageIndex, pageSize]);

  const memoizedData = useMemo(() => tableData ?? [], [tableData]);

  console.log(memoizedData);
  const table = useReactTable({
    data: memoizedData,
    columns: ColumnsCoinFN(),
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newPagination =
        updater instanceof Function
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="bg-blue-400">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={ColumnsCoinFN.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {totalPages}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Homepage;
