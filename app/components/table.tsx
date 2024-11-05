import { CoinsData } from "@/types";
import { formatValue } from "@/utils/formatNum";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<CoinsData>();

export function ColumnsCoinFN() {
  return [
    // Coin
    columnHelper.accessor("name", {
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
    columnHelper.accessor("nameid", {
      header: () => (
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
    columnHelper.accessor("price_usd", {
      header: () => <p>🤑 Price</p>,
      cell: (info) => (
        <div>
          <p>${formatValue(info.row.original?.price_usd || 0)}</p>
        </div>
      ),
    }),

    // Total Supply
    columnHelper.accessor("tsupply", {
      header: () => <p>📉 Total Supply</p>,
      cell: (info) => (
        <div>
          <p>{formatValue(info.row.original?.tsupply || 0)}</p>
        </div>
      ),
    }),
  ];
}
