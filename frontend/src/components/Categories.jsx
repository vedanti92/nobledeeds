import React, { useState } from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    navigate(`/?category=${selectedCategory}`);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
          className="form-control"
          displayEmpty
        >
          <MenuItem value="all">
            <i class="fa-solid fa-layer-group"></i>All
          </MenuItem>
          <MenuItem value="disaster-relief">
            <i class="fa-solid fa-house-crack"></i>Disaster Relief
          </MenuItem>
          <MenuItem value="food-assistance">
            <i class="fa-solid fa-utensils"></i>Food Assistance
          </MenuItem>
          <MenuItem value="education">
            <i class="fa-solid fa-chalkboard-user"></i>Education
          </MenuItem>
          <MenuItem value="animals">
            <i class="fa-solid fa-paw"></i>Animals
          </MenuItem>
          <MenuItem value="children">
            <i class="fa-solid fa-child"></i>Children
          </MenuItem>
          <MenuItem value="senior-care">
            <i class="fa-solid fa-person-cane"></i>Senior Care
          </MenuItem>
          <MenuItem value="specially-abled">
            <i class="fa-solid fa-wheelchair"></i>Specially Abled
          </MenuItem>
          <MenuItem value="medical-aid">
            <i class="fa-solid fa-suitcase-medical"></i>Medical Aid
          </MenuItem>
          <MenuItem value="women">
            <i class="fa-solid fa-person-dress"></i>Women
          </MenuItem>
          <MenuItem value="environment">
            <i class="fa-solid fa-seedling"></i>Environment
          </MenuItem>
          <MenuItem value="others">
            <i class="fa-solid fa-ellipsis"></i>Others
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Categories;
