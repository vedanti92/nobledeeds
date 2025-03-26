import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./AddCampaign.css";

function AddCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    goalAmount: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/addCampaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
      alert("Failed to add campaign");
    }
  };

  return (
    <div className="row">
      <div style={{ marginTop: "80px", width: "100%" }}>
        <h2>Add Campaign</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please provide a title.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              Please provide a description.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              required
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please provide an image URL.</div>
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="orgName" className="form-label">
                Organization Name
              </label>
              <input
                name="orgName"
                id="orgName"
                required
                className="form-control"
                value={formData.orgName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please provide organization's name.
              </div>
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                name="location"
                id="location"
                required
                className="form-control"
                value={formData.location}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please provide organization's location.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="goalAmount" className="form-label">
                Goal Amount
              </label>
              <input
                type="number"
                name="goalAmount"
                id="goalAmount"
                required
                className="form-control"
                value={formData.goalAmount}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                Please provide a goal amount.
              </div>
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="all">All</option>
                <option value="disaster-relief">Disaster Relief</option>
                <option value="food-assistance">Food Assistance</option>
                <option value="education">Education</option>
                <option value="animals">Animals</option>
                <option value="children">Children</option>
                <option value="senior-care">Senior Care</option>
                <option value="women">Women</option>
                <option value="specially-abled">Specially Abled</option>
                <option value="medical-aid">Medical Aid</option>
                <option value="environment">Environment</option>
                <option value="others">Others</option>
              </select>
              <div className="invalid-feedback">Please select a category.</div>
            </div>
          </div>

          <div className="mt-3">
            <Button type="submit" variant="outlined" color="error">
              Add Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCampaign;
