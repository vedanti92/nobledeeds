import * as React from "react";
import { useCookies } from "react-cookie"; // Import useCookies for authentication
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./Navbar.css";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!cookies.token;

  // Open & close menu handlers
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Handle logout
  const handleLogout = () => {
    removeCookie("token", { path: "/" }); // Remove token
    navigate("/");
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img
            src="/images/logo.png"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          />

          {/* Responsive Menu for Small Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
              <MenuItem onClick={() => navigate("/addCampaign")}>
                Add Campaign
              </MenuItem>
            </Menu>
          </Box>

          {/* Navigation Links for Large Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button sx={{ mx: 2, color: "black" }}>Home</Button>
            </Link>
            <Link to="/addCampaign" style={{ textDecoration: "none" }}>
              <Button sx={{ mx: 2, color: "black" }}>Add Campaign</Button>
            </Link>
          </Box>

          {/* Search Bar */}
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
                  type="submit"
                  className="search-btn"
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

          {/* User Avatar & Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" src="/images/user.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                // If user is logged in, show Account & Logout
                <>
                  <MenuItem onClick={() => navigate("/account")}>
                    <Typography sx={{ textAlign: "center" }}>
                      Account
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                // If user is not logged in, show Login & Signup
                <>
                  <MenuItem onClick={() => navigate("/login")}>
                    <Typography sx={{ textAlign: "center" }}>Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/signup")}>
                    <Typography sx={{ textAlign: "center" }}>Signup</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
