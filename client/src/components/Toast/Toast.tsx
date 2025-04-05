// Toast.js
import { useEffect, useState } from "react";
import "./Toast.css";
import { useAccount, StateType } from "../../store/store";

const Toast = () => {
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const account = useAccount((state) => (state as StateType).account);

  useEffect(() => {
    if (account.publicKey === "") {
      setMessage("Wallet disconnected !");
      setColor("red");
    } else {
      setMessage("Wallet connected !");
      setColor("green");
    }
    setVisible(true);
  }, [account]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, [message, color]);

  return (
    <div className={`toast ${color} ${visible ? "slide-in" : "slide-out"}`}>
      <span className="message">{message}</span>
    </div>
  );
};

export default Toast;
