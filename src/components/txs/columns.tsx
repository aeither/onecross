import { TxsData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export type Tx = {
  nonce: number;
  value: string;
  hash: string;
  tx_fee: number;
};

export const columns: ColumnDef<TxsData>[] = [
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "tx_fee",
    header: "Fee",
  },
  {
    accessorKey: "transaction_hash",
    header: "Hash",
  },
  {
    accessorKey: "nonce",
    header: "Nonce",
  },
  {
    accessorKey: "to_address",
    header: "To",
  },
  {
    accessorKey: "gas_price",
    header: "Gas Price",
  },
  {
    accessorKey: "block_timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "from_address",
    header: "From",
  },
];
