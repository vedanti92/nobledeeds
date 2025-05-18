import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Grid, Container } from "@mui/material";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CampaignCard from "../components/CampaignCard";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const { data } = await axios.post(
            "/",
            {},
            { withCredentials: true }
          );
          // Get the current session ID from localStorage
          const currentSessionId = localStorage.getItem("sessionId") || "";
          // Create a unique session identifier combining user and a timestamp
          const loginSessionId = `${data.user}-${Date.now()}`;

          if (data.user) {
            // If this is a new session or user changed
            if (!currentSessionId || !currentSessionId.startsWith(data.user)) {
              // Show welcome message
              toast.success(`Welcome back, ${data.user}!`);
              // Save the new session ID
              localStorage.setItem("sessionId", loginSessionId);
            }
            setUsername(data.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data");
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  return (
    <>
      <div className="home-container">
        <Carousel />
        <div className="categories-container">
          <Categories />
        </div>
        <Campaigns />
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    axios
      .get("/home", {
        params: { category: selectedCategory },
        withCredentials: true
      })
      .then((res) => {
        setCampaigns(res.data);
      })
      .catch((err) => {
        console.error("Error fetching campaigns:", err);
        toast.error("Error loading campaigns");
      });
  }, [selectedCategory]);

  const filteredCampaigns =
    category === "all"
      ? campaigns
      : campaigns.filter((c) => c.category === category);

  return (
    <>
      <Container maxWidth="lg" className="mb-5">
        <Grid 
          container 
          spacing={4}
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{ minHeight: '60vh' }}
        >
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
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
            ))
          ) : (
            <Grid item xs={12}>
              <h6 className="text-center">No campaigns found for this category.</h6>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
