import React from "react";
import "./Carousel.css";

function Carousel() {
  return (
    <div className="container">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide carousel-fade mt-3"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/img1.png" className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item">
            <img src="/images/img2.png" className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item">
            <img src="/images/img3.png" className="d-block w-100" alt="image" />
          </div>
        </div>
        <button
          className="carousel-control-prev icon"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="carousel-control-next icon"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
