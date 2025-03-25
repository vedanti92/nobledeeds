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

  const handleDonateClick = () => {
    navigate(`/donate/${id}`);
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

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  return (
    <div className="show-container col-8 mx-auto" style={{marginTop: "80px"}}>
      <div className="row">
        <div className="col-7">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ width: "100%" }}
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
            <div className="dropdown">
              <button
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  border: "none",
                  background: "none",
                  fontSize: "22px",
                  color: "black",
                  alignItems: "center",
                  padding: "0",
                }}
              >
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button className="dropdown-item" onClick={handleEditClick}>
                    <i className="fa-solid fa-pencil"></i> Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleDeleteClick}
                  >
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </li>
              </ul>
            </div>
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
        </div>
        <div className="col-1"></div>
        <div
          className="col-4 mt-3 d-flex flex-column"
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            padding: "15px 20px",
            height: "500px",
          }}
        >
          <div className="org-details">
            <p>Organization Name:</p>
            <div
              className="org-name px-2"
              style={{
                border: "1px solid black",
                paddingTop: "5px",
                paddingBottom: "3px",
                borderRadius: "8px",
              }}
            >
              <i
                class="fa-solid fa-building-ngo"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              {campaign.orgName}
            </div>
            <br />
            <p>Location:</p>
            <div
              className="location px-2"
              style={{
                border: "1px solid black",
                paddingTop: "5px",
                paddingBottom: "3px",
                borderRadius: "8px",
              }}
            >
              <i
                class="fa-solid fa-location-dot"
                style={{ color: "gray", fontSize: "18px" }}
              ></i>
              {campaign.location}
            </div>
          </div>
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
          <div className="mt-auto">
            <Button
              onClick={handleDonateClick}
              variant="outlined"
              color="error"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
