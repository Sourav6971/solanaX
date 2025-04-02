import "./WalletNotification.css";
import { useEffect, useState } from "react";

const WalletNotification = ({ isVisible }: { isVisible: boolean }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => setShow(false), 3000); // Hide after 3 seconds
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform duration-500 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      Wallet Connected
    </div>
  );
};

export default WalletNotification;
