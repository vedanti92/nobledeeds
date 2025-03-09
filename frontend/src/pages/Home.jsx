import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CampaignCard from "../components/CampaignCard";
import { Container } from "@mui/material";
import "./Home.css";

function Home() {
  return (
    <>
      <Carousel />
      <div className="categories-container">
        <Categories />
      </div>
      <Campaigns />
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
      .get("http://localhost:8080/home", {
        params: { category: selectedCategory },
      })
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, [selectedCategory]);

  const filteredCampaigns =
    category === "all"
      ? campaigns
      : campaigns.filter((c) => c.category === category);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign._id}>
                <CampaignCard campaign={campaign} />
              </Grid>
            ))
          ) : (
            <h6>No campaigns found for this category.</h6>
          )}
        </Grid>
      </Container>
    </>
  );
};
