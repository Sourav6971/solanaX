import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { StateType, useAccount } from "../../store/store";

const Home = () => {
  const [token, setToken] = useState([]);
  const account = useAccount((state) => (state as StateType).account);

  useEffect(() => {
    axios
      .post(BACKEND_URL + "get-token", {
        publicKey: account.publicKey,
      })
      .then((res) => setToken(res.data.tokens))
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      {token.map((value, index) => (
        <div key={index}>{value.token_name}</div>
      ))}
    </div>
  );
};

export default Home;
