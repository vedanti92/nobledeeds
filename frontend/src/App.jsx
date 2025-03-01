import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
