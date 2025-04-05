import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { StateType, useAccount } from "../../store/store";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";

interface ValueType {
  token_name: string;
  mint_address: string;
}

const Home = () => {
  const [token, setToken] = useState([]);
  const [loading, setLoading] = useState(true);
  const account = useAccount((state) => (state as StateType).account);

  useEffect(() => {
    if (account.publicKey === "") return;
    setLoading(true);
    axios
      .post(BACKEND_URL + "get-token", {
        publicKey: account.publicKey,
      })
      .then((res) => setToken(res.data.tokens))
      .finally(() => setLoading(false));
  }, [account]);

  if (account.publicKey === "") return <></>;

  return (
    <div
      className="home-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {loading ? (
        <div className="loading-component">
          <Loader />
        </div>
      ) : token.length === 0 ? (
        <span className="loading-component">Create Token First</span>
      ) : (
        <>
          <h1>Your Tokens</h1>
          <table className="token-table">
            <thead>
              <tr>
                <th>Token Name</th>
                <th>Mint Address</th>
              </tr>
            </thead>
            <tbody>
              {token.map((value: ValueType, index) => (
                <tr key={index}>
                  <td>{value.token_name}</td>
                  <td>{value.mint_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Toast />
    </div>
  );
};

export default Home;
