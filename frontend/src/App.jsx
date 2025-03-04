import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampaignDetails from "./pages/CampaignDetails";
import SearchResults from "./pages/SearchResults";
import AddCampaign from "./pages/AddCampaign";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/addCampaign" element={<AddCampaign />} />
        <Route path="/:id" element={<CampaignDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
