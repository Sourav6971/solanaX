import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Info from "./components/Info/Info";
const App = () => {
  return (
    <>
      <Navbar />
      <Info />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
