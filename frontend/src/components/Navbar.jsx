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
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    logout();
    navigate("/login");
  };

  const handleNav = (path) => {
    setAnchorElNav(null);
    navigate(path);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ width: "100%" }}>
          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />

          {/* Desktop Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
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

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSearch}>
              <div
                className="search-bar"
                style={{ display: "flex", alignItems: "center", gap: "5px", margin: "10px" }}
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

          {/* Mobile & Desktop Account/Login */}
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: 2,
            }}
          >
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

          {/* Mobile Hamburger Icon (at the extreme right) */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleNav("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNav("/addCampaign")}>
                <Typography textAlign="center">Add Campaign</Typography>
              </MenuItem>
              {isAuthenticated ? (
                <>
                  <MenuItem onClick={() => handleNav("/account")}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorElNav(null);
                      handleLogout();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => handleNav("/login")}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
