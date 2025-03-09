import React, { useState } from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

// function Categories() {
//   return (
//     <div class="categories my-3">
//       <a href="/?category=all" class="category">
//         <i class="fa-solid fa-layer-group"></i>
//         <span>All</span>
//       </a>
//       <a href="/?category=disaster-relief" class="category">
//         <i class="fa-solid fa-house-crack"></i>
//         <span>Disaster Relief</span>
//       </a>
//       <a href="/?category=food-assistance" class="category">
//         <i class="fa-solid fa-utensils"></i>
//         <span>Food Assistance</span>
//       </a>
//       <a href="/?category=education" class="category">
//         <i class="fa-solid fa-chalkboard-user"></i>
//         <span>Education</span>
//       </a>
//       <a href="/?category=animals" class="category">
//         <i class="fa-solid fa-paw"></i>
//         <span>Animals</span>
//       </a>
//       <a href="/?category=children" class="category">
//         <i class="fa-solid fa-child"></i>
//         <span>Children</span>
//       </a>
//       <a href="/?category=senior-care" class="category">
//         <i class="fa-solid fa-person-cane"></i>
//         <span>Senior Care</span>
//       </a>
//       <a href="/?category=specially-abled" class="category">
//         <i class="fa-solid fa-wheelchair"></i>
//         <span>Specially Abled</span>
//       </a>
//       <a href="/?category=medical-aid" class="category">
//         <i class="fa-solid fa-suitcase-medical"></i>
//         <span>Medical Aid</span>
//       </a>
//       <a href="/?category=women" class="category">
//         <i class="fa-solid fa-person-dress"></i>
//         <span>Women</span>
//       </a>
//       <a href="/?category=environment" class="category">
//         <i class="fa-solid fa-seedling"></i>
//         <span>Environment</span>
//       </a>
//       <a href="/?category=others" class="category">
//         <i class="fa-solid fa-ellipsis"></i>
//         <span>Others</span>
//       </a>
//     </div>
//   );
// }

function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    navigate(`/?category=${selectedCategory}`);
  };

  return (
    <div>
      <select
        name="category"
        id="category"
        value={category}
        onChange={handleCategoryChange}
        className="form-control"
      >
        <option value="all">All</option>
        <option value="disaster-relief">Disaster Relief</option>
        <option value="food-assistance">Food Assistance</option>
        <option value="education">Education</option>
        <option value="animals">Animals</option>
        <option value="children">Children</option>
        <option value="senior-care">Senior Care</option>
        <option value="specially-abled">Specially Abled</option>
        <option value="medical-aid">Medical Aid</option>
        <option value="women">Women</option>
        <option value="environment">Environment</option>
        <option value="others">Others</option>
      </select>
    </div>
  );
}

export default Categories;
