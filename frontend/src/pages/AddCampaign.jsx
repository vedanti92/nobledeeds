import React from "react";

function AddCampaign() {
  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6" style={{ marginTop: "80px" }}>
        <h2>Add Campaign</h2>
        <form action="">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" name="title" id="title" className="form-control" />
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
}

export default AddCampaign;
