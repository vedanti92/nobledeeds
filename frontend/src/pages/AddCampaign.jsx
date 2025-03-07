import React from "react";
import Button from "@mui/material/Button";

function AddCampaign() {
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6" style={{ marginTop: "80px" }}>
        <h2>Add Campaign</h2>
        <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add a title for your campaign"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Add description"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Add an image URL"
              className="form-control"
            />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="goalAmount" className="form-label">
                Goal Amount
              </label>
              <input
                type="text"
                name="goalAmount"
                id="goalAmount"
                placeholder="Add total amount required"
                className="form-control"
              />
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select name="category" id="category" className="form-control">
                <option value="" disabled selected>
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
            </div>
          </div>

          <div className="mt-3">
            <Button variant="outlined" color="error">
              Add Campaign
            </Button>
          </div>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
}

export default AddCampaign;
