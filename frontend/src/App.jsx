import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider
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
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          {" "}
          {/* Now inside BrowserRouter */}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
