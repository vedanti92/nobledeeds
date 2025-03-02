import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CampaignCard from "../components/CampaignCard";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
      <Carousel />
      <Categories />
      <Campaigns />
    </>
  );
}

export default Home;

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/home")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign._id}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
