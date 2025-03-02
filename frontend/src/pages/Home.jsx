import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";

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
    <div className="campaigns-container">
      {campaigns.map((campaign) => (
        <div className="card" style={{ width: "24rem" }} key={campaign._id}>
          <img
            src={campaign.image}
            className="card-img-top"
            alt={campaign.title}
            style={{ height: "14rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{campaign.title}</h5>
            <p className="card-text">{campaign.description}</p>
          </div>
          <div className="donation m-3">
            <div
              className="progress"
              role="progressbar"
              aria-label="Example with label"
              aria-valuenow={
                (campaign.raisedAmount / campaign.goalAmount) * 100
              }
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar overflow-visible text-dark px-3"
                style={{
                  width: `${
                    (campaign.raisedAmount / campaign.goalAmount) * 100
                  }%`,
                }}
              >
                {campaign.raisedAmount} Amount Raised
              </div>
            </div>
            <a href={`/${campaign._id}`} className="btn btn-light mt-3">
              Show More
            </a>
            &nbsp;
            <a href="/" className="btn btn-danger mt-3">
              Donate
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
