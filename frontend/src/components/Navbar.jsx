import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search triggered with:", searchQuery);

    if (!searchQuery.trim()) return;

    // Navigate to search results page
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="/images/logo.png"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button sx={{ mx: 2, color: "black", display: "block" }}>
                Home
              </Button>
            </Link>
            <Link to="/addCampaign" style={{ textDecoration: "none" }}>
              <Button sx={{ mx: 2, color: "black", display: "block" }}>
                Add Campaign
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSearch}>
              <div
                className="search-bar"
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <input
                  type="text"
                  style={{
                    border: "2px solid black",
                    outline: "none",
                    padding: "10px",
                    borderRadius: "30px",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search campaigns..."
                />
                <button
                  className="search-btn"
                  type="submit"
                  style={{
                    backgroundColor: "#6cd4ff",
                    padding: "10px",
                    borderRadius: "100%",
                    height: "50px",
                    width: "50px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <Link to="/account" style={{ textDecoration: "none" }}>
                  <Button sx={{ mx: 2, color: "black" }}>Account</Button>
                </Link>
                <Button sx={{ mx: 2, color: "black" }} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ mx: 2, color: "black" }}>Login</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
