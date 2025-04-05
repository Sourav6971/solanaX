import Wallet from "../Wallet/Wallet";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiSolana } from "react-icons/si";

import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const menuItems = ["Home", "About", "Login"];
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="element">
        <div className="logo">
          <SiSolana />
        </div>

        {/* Desktop and Medium Screen Menu */}
        <div className="menu">
          {menuItems.map((value, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() => {
                navigate(`/${value}`);
              }}
            >
              {value}
            </div>
          ))}
        </div>

        {/* Wallet Button */}
        <div className="wallet" onClick={() => navigate("/Home")}>
          <Wallet />
        </div>

        {/* Hamburger Icon (Visible only on small screens) */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </div>

        {/* Glassmorphic Side Menu (Only on small screens) */}
        <div className={`side-menu ${isOpen ? "open" : ""}`}>
          <X className="cross-icon" />

          {menuItems.map((value, index) => (
            <div
              className="menu-items"
              key={index}
              onClick={() => setIsOpen(false)}
            >
              {value}
            </div>
          ))}
        </div>
        {isOpen && (
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
