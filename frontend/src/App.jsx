import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Carousel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
