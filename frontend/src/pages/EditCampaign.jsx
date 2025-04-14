import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./EditCampaign.css";
import axios from "axios";

function EditCampaign() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = React.useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    orgInfo: "",
    image: null,
    goalAmount: "",
    category: "",
    orgName: "",
    location: "",
  });

  const [existingImage, setExistingImage] = useState("");

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to edit campaigns");
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate]);

  // Fetch existing campaign data
  useEffect(() => {
    if (id && isAuthenticated) {
      fetchCampaign();
    }
  }, [id, isAuthenticated]);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`/campaign/${id}`, {
        withCredentials: true,
      });

      if (response.data) {
        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          orgInfo: response.data.orgInfo || "",
          image: null,
          goalAmount: response.data.goalAmount || "",
          category: response.data.category || "",
          orgName: response.data.orgName || "",
          location: response.data.location || "",
        });
        setExistingImage(response.data.image);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
      toast.error("Failed to fetch campaign details");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0], // Store the File object directly
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

    try {
      const formDataToSend = new FormData();

      // Add all text fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("orgInfo", formData.orgInfo);
      formDataToSend.append("goalAmount", formData.goalAmount);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("orgName", formData.orgName);
      formDataToSend.append("location", formData.location);

      // Handle image - if new image selected, use that, otherwise keep existing
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios({
        method: "put",
        url: `/editCampaign/${id}`,
        data: formDataToSend,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Campaign updated successfully!");
        navigate(`/campaign/${id}`);
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error(error.response?.data?.message || "Failed to update campaign");
    }
  };

  return (
    <div className="edit-container row mb-5">
      <ToastContainer />
      <div style={{ marginTop: "80px", width: "100%" }}>
        <h2>Edit Campaign</h2>
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
            {existingImage && (
              <div className="mt-2">
                <p>Existing Image:</p>
                <img
                  src={existingImage}
                  alt="Existing"
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
              onChange={handleChange}
              accept="image/*"
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
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCampaign;
