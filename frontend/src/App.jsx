import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampaignDetails from "./pages/CampaignDetails";
import SearchResults from "./pages/SearchResults";
import AddCampaign from "./pages/AddCampaign";
import EditCampaign from "./pages/EditCampaign";
import Donation from "./pages/Donation";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/addCampaign" element={<AddCampaign />} />
          <Route path="/editCampaign/:id" element={<EditCampaign />} />
          <Route path="/donate/:id" element={<Donation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<CampaignDetails />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
