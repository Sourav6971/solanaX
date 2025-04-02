import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "./Wallet.css";

import { useAccount } from "../../store/store";
import { SetStateAction, useState } from "react";

interface Account {
  publicKey: string;
  balance: string;
}

interface AccountState {
  account: Account;
  setAccount: (state: Account) => { set(): void };
}

declare global {
  interface Window {
    solana?: any;
  }
}

interface ConnectionType {
  connected: boolean;
  setConnected: React.Dispatch<SetStateAction<boolean>>;
  setAccount: (state: Account) => void;
}

async function connectWallet({
  connected,
  setConnected,
  setAccount,
}: ConnectionType) {
  const provider = window.solana;

  if (provider && provider.isPhantom) {
    if (connected) {
      // Disconnect wallet
      await provider.disconnect();
      setAccount({ publicKey: "", balance: "" });
      setConnected(false);
      alert("Wallet Disconnected!");
    } else {
      try {
        // Connect wallet
        await provider.connect();

        const walletAddress = provider.publicKey.toString();
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(
          new PublicKey(walletAddress)
        );

        const accountData: Account = {
          publicKey: walletAddress,
          balance: (balance / 1e9).toString(),
        };

        setAccount(accountData);
        alert("Wallet connected successfully!");
        setConnected(true);
      } catch (err) {
        alert("Error connecting wallet:");
      }
    }
  } else {
    alert("Please install Phantom Wallet extension");
  }
}

const Wallet = () => {
  const setAccount = useAccount((state) => (state as AccountState).setAccount);
  const [connected, setConnected] = useState(false);

  return (
    <button
      className="connect-button"
      onClick={() => connectWallet({ connected, setConnected, setAccount })}
    >
      {connected ? "Disconnect" : "Connect"}
    </button>
  );
};

export default Wallet;
