import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Signer, ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [signer, setSigner] = useState<Signer>();

  const { open } = useWeb3Modal();

  const connectWallet = async () => {
    const windowEthereum = (window as unknown as any).ethereum;
    if (typeof windowEthereum !== "undefined") {
      try {
        // Request account access if needed
        await windowEthereum.request({
          method: "eth_requestAccounts",
        });

        // Create an ethers provider instance
        const provider = new ethers.providers.Web3Provider(windowEthereum);

        // Get the selected account address
        const accounts = await provider.listAccounts();
        const selectedAddress = accounts[0];

        // Update the connected address state
        selectedAddress && setConnectedAddress(selectedAddress);

        // Set the signer
        const connectedSigner = provider.getSigner();
        setSigner(connectedSigner);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error("Please install MetaMask to connect your wallet.");
    }
  };

  return (
    <>
      <main className=" flex min-h-[calc(100vh-64px)] w-full flex-col">
        <div className="container flex w-full flex-col gap-4 py-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Heading
          </h1>
          <Button variant={"default"} onClick={() => open()}>
            Open Connect Modal
          </Button>

          <Button
            onClick={() => {
              connectWallet();
            }}
          >
            connectWallet
          </Button>
          <Button
            onClick={() => {
              alert("hello");
              console.log("Hello");
            }}
          >
            Hello
          </Button>
        </div>
      </main>
    </>
  );
}
