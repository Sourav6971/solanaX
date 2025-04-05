import { useAccount } from "../../store/store";
import { FiCopy } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";

import "./Info.css";
import { useNavigate } from "react-router-dom";

interface Account {
  publicKey: string;
  balance: string;
}

const Info = () => {
  const options = [
    "Request Airdrop",
    "Send Tokens",
    "Mint Tokens",
    "View Transactions",
  ];
  const account = useAccount(
    (state) => (state as { account: Account }).account
  );
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(account.publicKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const handleClick = (value: string) => {
    switch (value) {
      case "Request Airdrop": {
        navigate("/Airdrop");
      }
    }
  };

  return (
    <div className="info-container">
      {account.publicKey === "" ? (
        <div>Connect wallet to view details</div>
      ) : (
        <>
          <div className="information">
            <div>
              Address:{" "}
              {account.publicKey.slice(0, 4) +
                "................" +
                account.publicKey.slice(-6)}
              <div onClick={handleCopy}>
                {copied ? (
                  <IoMdCheckmarkCircleOutline className="copy-button" />
                ) : (
                  <FiCopy className="copy-button" />
                )}
              </div>
            </div>
            <div>Balance: {account.balance + " (SOL)"}</div>
          </div>

          <div className="option-container">
            {options.map((value, index) => (
              <div
                className="option"
                key={index}
                onClick={() => handleClick(value)}
              >
                {value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Info;
