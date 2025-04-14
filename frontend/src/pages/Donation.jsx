import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Donation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated) {
      toast.warning("Please login to make a donation");
      navigate("/login");
      return;
    }

    // Fetch campaign details
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}`);
        setCampaign(response.data);
      } catch (err) {
        console.error("Error fetching campaign", err);
        toast.error("Error fetching campaign details");
        navigate("/");
      }
    };

    fetchCampaign();
  }, [id, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast.warning("Please login to make a donation");
      navigate("/login");
      return;
    }

    const donation = parseFloat(donationAmount);

    if (!donation || donation <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    const newRaisedAmount = campaign.raisedAmount + donation;

    if (newRaisedAmount > campaign.goalAmount) {
      toast.warning(
        "Donation exceeds goal amount! Please enter a lower amount."
      );
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/donate/${id}`,
        { raisedAmount: donation },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Thank you for your donation!");
      navigate(`/${id}`);
    } catch (error) {
      console.error("Error updating donation:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to make a donation");
        navigate("/login");
      } else {
        toast.error("Failed to process donation");
      }
    }
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="donation-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <h2 className="mb-5">{campaign.title}</h2>
      <div
        className="box"
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "40px",
          width: "350px",
          height: "300px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form mb-5">
            <label
              htmlFor="donationAmount"
              className="form-label mb-5"
              style={{
                display: "block",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              Donation Amount
            </label>
            <input
              type="number"
              name="donationAmount"
              id="donationAmount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount"
              className="form-control"
              style={{
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="mt-auto">
            <Button
              type="submit"
              variant="outlined"
              color="error"
              style={{ width: "100%" }}
              sx={{ fontFamily: "Merriweather, serif" }}
            >
              Donate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Donation;
