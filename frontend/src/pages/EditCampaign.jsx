import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCampaign() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get campaign ID from URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    goalAmount: "",
    category: "",
    orgName: "",
    location: "",
  });

  const [existingImage, setExistingImage] = useState("");

  // Fetch existing campaign data if editing
  useEffect(() => {
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`);
      const data = await response.json();
      setFormData({ ...data, image: "" });
      setExistingImage(data.image);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      toast.error("Failed to fetch campaign details");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      image: formData.image || existingImage, // Keep old image if new one isn't provided
    };

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    try {
      const url = id
        ? `http://localhost:8080/editCampaign/${id}`
        : "http://localhost:8080/addCampaign";

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success("Campaign saved successfully");
        navigate(`/${id}`);
      } else {
        const errorMessage = await response.json();
        toast.error(errorMessage.message || "Failed to save campaign");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      toast.error("Failed to save campaign");
    }
  };

  return (
    <div className="row mb-5">
      <ToastContainer />
      <div style={{ marginTop: "80px", width: "100%" }}>
        <h2>{id ? "Edit Campaign" : "Add Campaign"}</h2>
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
            {existingImage && (
              <div className="mt-2">
                <p>Existing Image:</p>
                <img
                  src={existingImage}
                  alt="Existing Image"
                  style={{ width: "150px", borderRadius: "8px" }}
                />
              </div>
            )}
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              value={formData.image}
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
            <Button type="submit" variant="outlined" color="error">
              {id ? "Save Changes" : "Add Campaign"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCampaign;
