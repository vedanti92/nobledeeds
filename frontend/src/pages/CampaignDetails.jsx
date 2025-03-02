import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

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
    <div className="container col-6 offset-3">
      <h2 className="mb-3">Campaign Details</h2>
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
    </div>
  );
}

export default CampaignDetails;
