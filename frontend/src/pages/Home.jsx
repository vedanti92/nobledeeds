import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import CampaignCard from "../components/CampaignCard";
import { Container } from "@mui/material";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && !hasShownWelcome) {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/",
            {},
            { withCredentials: true }
          );
          setUsername(data.user);
          toast.success(`Welcome back, ${data.user}!`);
          setHasShownWelcome(true);
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
      <div>
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
      <Container sx={{ my: 4 }}>
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
