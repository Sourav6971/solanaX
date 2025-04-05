import React, { useEffect, useState } from "react";

import "./Airdrop.css";

import { StateType, useAccount } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Airdrop: React.FC = () => {
  const account = useAccount((state) => (state as StateType).account);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(account.publicKey);
    if (account.publicKey === "") navigate("/Home");
  }, [account]);

  const [isAirdropping, setIsAirdropping] = useState(false);

  const handleAirdrop = () => {
    setIsAirdropping(true);
  };

  return (
    <>
      <div className="container">
        <input type="text" placeholder="0.001" />

        <button className="airdrop-btn" onClick={handleAirdrop}>
          {isAirdropping ? "Airdropping..." : "Airdrop SOL"}
        </button>
      </div>
    </>
  );
};

export default Airdrop;
