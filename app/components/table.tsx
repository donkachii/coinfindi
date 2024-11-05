import { formatValue } from "@/utils/formatNum";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export function ColumnsCoinFN() {
  return [
    // Coin
    columnHelper.accessor("coin", {
      header: () => (
        <div className="pl-6">
          <p>💰 Coin</p>
        </div>
      ),
      cell: (info) => (
        <div>
          <p className="pl-6">{info.row.original?.name}</p>
        </div>
      ),
    }),

    // Code
    columnHelper.accessor("code", {
      header: ({ column }) => (
        <div>
          <p>📄 Code</p>
        </div>
      ),
      cell: (info) => (
        <div>
          <p className="font-bold">{info.row.original?.symbol} </p>
        </div>
      ),
    }),

    // Price
    columnHelper.accessor("price", {
      header: ({ column }) => <p>🤑 Price</p>,
      cell: (info) => (
        <div>
          <p>${formatValue(info.row.original?.price_usd)}</p>
        </div>
      ),
    }),

    // Total Supply
    columnHelper.accessor("total", {
      header: ({ column }) => <p>📉 Total Supply</p>,
      cell: (info) => (
        <div>
          <p>{formatValue(info.row.original?.tsupply)}</p>
        </div>
      ),
    }),
  ];
}
