import React, { useEffect, useState } from "react";

import "./Airdrop.css";

import { StateType, useAccount } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Airdrop: React.FC = () => {
  const [amount, setAmount] = useState("");
  const account = useAccount((state) => (state as StateType).account);
  const navigate = useNavigate();

  useEffect(() => {
    if (account.publicKey === "") navigate("/Home");
  }, [account]);

  const [isAirdropping, setIsAirdropping] = useState(false);

  const handleAirdrop = () => {
    setIsAirdropping(true);
    axios
      .post(BACKEND_URL + "get-airdrop", {
        publicKey: account.publicKey,
        amount,
      })
      .then(() => {
        alert("Airdrop successfull!");
        navigate("/Home");
      })
      .catch(() => {
        alert("Could not airdrop");
      })
      .finally(() => {
        setIsAirdropping(false);
      });
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="0.001"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="airdrop-btn" onClick={handleAirdrop}>
          {isAirdropping ? "Airdropping..." : "Airdrop SOL"}
        </button>
      </div>
    </>
  );
};

export default Airdrop;
