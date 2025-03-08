import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editCampaign/${id}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}`)
      .then((res) => {
        setCampaign(res.data);
      })
      .catch((err) => console.error("Error fetching campaign", err));
  }, [id]);

  if (!campaign) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container col-6 offset-3 mb-5">
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h2
          className="mb-3"
          style={{
            margin: "0",
            width: "fit-content",
          }}
        >
          Campaign Details
        </h2>
        <button
          onClick={handleEditClick}
          style={{
            width: "fit-content",
            border: "none",
            background: "none",
            fontSize: "22px",
            color: "gray",
            alignItems: "center",
            padding: "0",
          }}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
      <img
        src={campaign.image}
        alt={campaign.title}
        style={{
          height: "300px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
        className="mb-3"
      />
      <h3 className="mb-3">{campaign.title}</h3>
      <p className="mb-3">{campaign.description}</p>
      <br />
      <p className="mb-3">Goal Amount: ₹ {campaign.goalAmount}</p>
      <br />
      <Box className="mb-3">
        <LinearProgress
          variant="determinate"
          value={(campaign.raisedAmount / campaign.goalAmount) * 100}
        />
        <Typography variant="caption">
          ₹ {campaign.raisedAmount} Amount Raised
        </Typography>
      </Box>
      <br />
      <div
        className="btns"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button href="/" variant="outlined" color="error">
          Donate
        </Button>

        <Button href="" variant="outlined" color="primary">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CampaignDetails;
