import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./CampaignDetails.css";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}`);
        setCampaign(response.data);

        if (isAuthenticated) {
          // Check if current user is the campaign owner
          const userResponse = await axios.post(
            "http://localhost:8080/",
            {},
            { withCredentials: true }
          );

          const loggedInUserUsername = String(userResponse.data.user);
          const campaignOwnerUsername = String(response.data.userId.username);

          setIsOwner(loggedInUserUsername === campaignOwnerUsername);
        }
      } catch (err) {
        console.error("Error fetching campaign", err);
        toast.error("Error fetching campaign details");
        navigate("/notfound");
      }
    };
    fetchCampaign();
  }, [id, isAuthenticated]);

  const handleEditClick = () => {
    navigate(`/editCampaign/${id}`);
    toast.info("Editing campaign...");
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await axios.delete(`http://localhost:8080/${id}`);
        toast.success("Campaign deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting campaign:", error);
        toast.error("Failed to delete campaign");
      }
    }
  };

  const handleDonateClick = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to donate");
      navigate("/login");
      return;
    }
    navigate(`/donate/${id}`);
  };

  if (!campaign) {
    return <h3>Loading...</h3>;
  }

  return (
    <div
      className="show-container mx-auto"
      style={{ marginTop: "80px", width: "80%" }}
    >
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
            {isAuthenticated && isOwner && (
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
            )}
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
          <h6 style={{ color: "gray", fontStyle: "italic" }}>
            Created by: {campaign.userId.username}
          </h6>

          <h3 className="mb-3">{campaign.title}</h3>
          <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
            {campaign.description}
          </p>

          <h3 className="mb-3 mt-5">About Organization</h3>
          <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
            {campaign.orgInfo}
          </p>
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
