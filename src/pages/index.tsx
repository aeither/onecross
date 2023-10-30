import { columns } from "@/components/txs/columns";
import { DataTable } from "@/components/txs/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ENSDomainData, TxsResponse } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";

if (!process.env.NEXT_PUBLIC_CHAINBASE_KEY)
  throw new Error("NEXT_PUBLIC_CHAINBASE_KEY not found");
const NEXT_PUBLIC_CHAINBASE_KEY = process.env.NEXT_PUBLIC_CHAINBASE_KEY;

export default function Home() {
  const { open } = useWeb3Modal();
  const [address, setAddress] = useState("");
  const [domains, setDomains] = useState<ENSDomainData>();
  const [txs, setTxs] = useState<TxsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("1");

  // Fetch data
  const getEthDomains = async () => {
    const url = `https://api.chainbase.online/v1/account/ens?chain_id=1&address=${address}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": NEXT_PUBLIC_CHAINBASE_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json: ENSDomainData) => {
        console.log(json);
        setDomains(json);
      })
      .catch((err) => console.error("error:" + err));
  };

  const getTxs = async () => {
    const url = `https://api.chainbase.online/v1/account/txs?chain_id=${selectedNetwork}&address=${address}&page=1&limit=20`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": NEXT_PUBLIC_CHAINBASE_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json: TxsResponse) => {
        console.log(json);
        setTxs(json);
      })
      .catch((err) => console.error("error:" + err));
  };

  function SelectNetwork() {
    const networks = [
      { name: "Ethereum", value: "1" },
      { name: "Polygon", value: "137" },
      { name: "BSC", value: "56" },
      { name: "Avalanche", value: "43114" },
      { name: "Arbitrum One", value: "42161" },
      { name: "Optimism", value: "10" },
      { name: "Base", value: "8453" },
      { name: "zkSync", value: "324" },
    ];

    return (
      <Select
        onValueChange={(e) => {
          setSelectedNetwork(e);
          console.log("network: ", e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a network" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Networks</SelectLabel>
            {networks.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col">
        <div className="container flex w-full flex-col gap-4 py-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            OneCross
          </h1>
          {/* <Button variant={"default"} onClick={() => open()}>
            Open Connect Modal
          </Button> */}
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              defaultValue="0x064Bd35c9064fC3e628a3BE3310a1cf65488103D"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <Button
              onClick={async () => {
                setIsLoading(true);
                try {
                  // await getEthDomains();
                  await getTxs();
                } catch (error) {
                  console.log(error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              Search
            </Button>
          </div>

          <SelectNetwork />

          {isLoading && (
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
          )}

          {/* Show addess domains */}
          {domains && (
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Domains
            </h2>
          )}
          {domains?.data.map((domain) => (
            <>
              <div className="flex gap-4">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {formatDate(domain.expiration_time)}
                </p>
                <Badge>{domain.name}</Badge>
              </div>
            </>
          ))}

          {/* Show txs */}
          {txs && (
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Transactions
            </h2>
          )}
          {txs && (
            <>
              <DataTable columns={columns} data={txs.data} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
