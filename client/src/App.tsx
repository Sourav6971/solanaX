import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Info from "./components/Info/Info";
import Airdrop from "./pages/Airdrop/Airdrop";
import MintToken from "./pages/MintTokens/MintToken";
const App = () => {
  return (
    <>
      <Navbar />
      <Info />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Airdrop" element={<Airdrop />} />
        <Route path="/Create" element={<MintToken />} />
      </Routes>
    </>
  );
};

export default App;
