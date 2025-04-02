import { useAccount } from "../../store/store";
import "./Info.css";

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

  return (
    <div className="info-container">
      {account.publicKey === "" ? (
        <div>Connect wallet to view details</div>
      ) : (
        <>
          <div className="information">
            <div>
              {account.publicKey.slice(0, 4) +
                "................" +
                account.publicKey.slice(-6)}
            </div>
            <div>Balance: {account.balance + " (SOL)"}</div>
          </div>

          <div className="option-container">
            {options.map((value, index) => (
              <div className="option" key={index}>
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
