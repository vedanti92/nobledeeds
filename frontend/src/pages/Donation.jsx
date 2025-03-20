import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Donation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}`)
      .then((res) => setCampaign(res.data))
      .catch((err) => console.error("Error fetching campaign", err));
  }, [id]);

  if (!campaign) {
    return <h3>Loading...</h3>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const newRaisedAmount = campaign.raisedAmount + parseFloat(donationAmount);

    if (newRaisedAmount > campaign.goalAmount) {
      alert("Donation exceeds goal amount! Please enter a lower amount.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/donate/${id}`, {
        raisedAmount: newRaisedAmount,
      });

      alert("Donation successful! Thank you for your contribution.");
      setCampaign((prev) => ({
        ...prev,
        raisedAmount: newRaisedAmount, // Update state before navigating
      }));

      navigate(`/${id}`); // Redirect after updating UI
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="container"
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
