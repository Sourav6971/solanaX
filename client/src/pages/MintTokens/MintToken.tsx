import React, { useEffect, useState } from "react";

import "./MintToken.css";

import { StateType, useAccount } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Loader from "../../components/Loader/Loader";

const MintToken: React.FC = () => {
  const [name, setName] = useState("");
  const account = useAccount((state) => (state as StateType).account);
  const navigate = useNavigate();

  useEffect(() => {
    if (account.publicKey === "") navigate("/Home");
  }, [account]);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!name) {
      alert("Name cannot be empty!!");
      return;
    }
    setIsCreating(true);
    axios
      .post(BACKEND_URL + "create-token", {
        publicKey: account.publicKey,
        tokenName: name,
      })
      .then(() => {
        alert("Token created successfully");
      })
      .catch(() => {
        alert("Could not create token");
      })
      .finally(() => {
        setIsCreating(false);
        navigate("/Home");
      });
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Name your token..."
          onChange={(e) => setName(e.target.value)}
        />
        {isCreating ? (
          <Loader />
        ) : (
          <button className="airdrop-btn" onClick={handleCreate}>
            Create new Token
          </button>
        )}
      </div>
    </>
  );
};

export default MintToken;
