import React from "react";
import Button from "@mui/material/Button";

function Donation() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
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
        <form>
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
