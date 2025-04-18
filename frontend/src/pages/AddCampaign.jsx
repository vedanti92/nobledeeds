import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./AddCampaign.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddCampaign() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    orgInfo: "",
    image: "",
    goalAmount: "",
    category: "",
    orgName: "",
    location: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Please login to create a campaign");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("orgInfo", formData.orgInfo);
    formDataToSend.append("goalAmount", formData.goalAmount);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("orgName", formData.orgName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("/addCampaign", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.data) {
        toast.success("Campaign created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
      toast.error(error.response?.data?.message || "Failed to add campaign");
    }
  };

  return (
    <div className="add-container row mb-5">
      <div style={{ marginTop: "80px", width: "100%" }}>
        <h2>Add Campaign</h2>
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate
          encType="multipart/form-data"
        >
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
            <label htmlFor="orgInfo" className="form-label">
              Organization Information
            </label>
            <textarea
              name="orgInfo"
              id="orgInfo"
              required
              className="form-control"
              value={formData.orgInfo}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              Please provide information about your organization.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              required
              className="form-control"
              onChange={handleChange}
            />
            <div className="invalid-feedback">Please upload an image.</div>
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
            <Button
              type="submit"
              variant="outlined"
              color="error"
              sx={{ fontFamily: "Merriweather, serif" }}
            >
              Add Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCampaign;
