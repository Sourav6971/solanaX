import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Toast from "./components/Toast/Toast";
import Airdrop from "./pages/Airdrop/Airdrop";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Airdrop" element={<Airdrop />} />
      </Routes>
      <Toast />
    </>
  );
};

export default App;
