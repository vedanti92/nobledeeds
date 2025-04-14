import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper, Box, Grid } from "@mui/material";
import CampaignCard from "../components/CampaignCard";
import { AuthContext } from "../context/AuthContext";
import "./Account.css"
import { toast } from "react-toastify";

const Account = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data } = await axios.post(
          "/",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
          return;
        }

        setUserInfo({
          username: data.user,
          email: data.email,
        });

        const campaignsResponse = await axios.get(
          `/user/campaigns`,
          { withCredentials: true }
        );
        setUserCampaigns(campaignsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data. Please try logging in again.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="account-container" maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      {/* User Information Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Information
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Username: {userInfo.username}</Typography>
          {userInfo.email && (
            <Typography variant="h6">Email: {userInfo.email}</Typography>
          )}
        </Box>
      </Paper>

      {/* User's Campaigns Section */}
      <Typography variant="h4" gutterBottom>
        My Campaigns
      </Typography>
      {userCampaigns.length > 0 ? (
        <Grid 
          container 
          spacing={4}
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{ minHeight: '60vh' }}
        >
          {userCampaigns.map((campaign) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={campaign._id}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '100%' }}>
                <CampaignCard campaign={campaign} />
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" align="center">
            You haven't created any campaigns yet.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Account;
