import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import "./Wallet.css";

import { StateType, useAccount, Account } from "../../store/store";
import { SetStateAction, useState } from "react";
import Loader from "../Loader/Loader";

declare global {
  interface Window {
    solana?: any;
  }
}

interface ConnectionType {
  connected: boolean;
  setConnected: React.Dispatch<SetStateAction<boolean>>;
  setAccount: (state: Account) => void;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

async function connectWallet({
  connected,
  setConnected,
  setAccount,
  setLoading,
}: ConnectionType) {
  const provider = window.solana;

  if (provider && provider.isPhantom) {
    setLoading(true);
    if (connected) {
      // Disconnect wallet
      await provider.disconnect();
      setAccount({ publicKey: "", balance: "" });
      setLoading(false);
      setConnected(false);
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

        setConnected(true);
      } catch (err) {
        alert("Error connecting wallet:");
      } finally {
        setLoading(false);
      }
    }
  } else {
    alert("Please install Phantom Wallet extension");
  }
}

const Wallet = () => {
  const setAccount = useAccount((state) => (state as StateType).setAccount);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="connect-button"
      onClick={() =>
        connectWallet({ connected, setConnected, setAccount, setLoading })
      }
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div>{connected ? "Disconnect" : "Connect"}</div>
          <img src="/Phantom.svg" height={30} />
        </>
      )}
    </button>
  );
};

export default Wallet;
