import React from "react";

function AddCampaign() {
  return (
    <div
      className="container"
      style={{ marginTop: "80px", marginLeft: "200px", marginRight: "200px" }}
    >
      <h2>Add Campaign</h2>
      <form action="">
        <label htmlFor="title">Title</label> <br />
        <input type="text" name="title" id="title" />
      </form>
    </div>
  );
}

export default AddCampaign;
