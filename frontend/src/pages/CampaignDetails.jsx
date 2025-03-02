import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/${id}`)
      .then((res) => {
        setCampaign(res.data);
      })
      .catch((err) => console.error("Error fetching campaign", err));
  }, [id]);

  if (!campaign) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container offset-2">
      <h2>Campaign Details</h2>
      <img src={campaign.image} alt={campaign.title} />
      <p>{campaign.title}</p>
    </div>
  );
}

export default CampaignDetails;
