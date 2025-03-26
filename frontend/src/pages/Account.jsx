import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import CampaignCard from "../components/CampaignCard";

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verify user authentication
        const { data } = await axios.post(
          "http://localhost:8080",
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          navigate("/login");
          return;
        }

        setUserInfo({
          username: data.user,
          email: data.email // Add this if you're sending email in userVerification
        });

        // Fetch user's campaigns
        const campaignsResponse = await axios.get(
          `http://localhost:8080/user/campaigns`,
          { withCredentials: true }
        );
        setUserCampaigns(campaignsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
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
        <Grid container spacing={3}>
          {userCampaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign._id}>
              <CampaignCard campaign={campaign} />
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
