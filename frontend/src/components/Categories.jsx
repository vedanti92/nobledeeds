import React, { useState } from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    navigate(`/?category=${selectedCategory}`);
  };

  return (
    <div className="container">
      <Box>
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
          >
            <MenuItem value="all" className="category">
              <i class="fa-solid fa-layer-group"></i>All
            </MenuItem>
            <MenuItem value="disaster-relief" className="category">
              <i class="fa-solid fa-house-crack"></i>Disaster Relief
            </MenuItem>
            <MenuItem value="food-assistance" className="category">
              <i class="fa-solid fa-utensils"></i>Food Assistance
            </MenuItem>
            <MenuItem value="education" className="category">
              <i class="fa-solid fa-chalkboard-user"></i>Education
            </MenuItem>
            <MenuItem value="animals" className="category">
              <i class="fa-solid fa-paw"></i>Animals
            </MenuItem>
            <MenuItem value="children" className="category">
              <i class="fa-solid fa-child"></i>Children
            </MenuItem>
            <MenuItem value="senior-care" className="category">
              <i class="fa-solid fa-person-cane"></i>Senior Care
            </MenuItem>
            <MenuItem value="specially-abled" className="category">
              <i class="fa-solid fa-wheelchair"></i>Specially Abled
            </MenuItem>
            <MenuItem value="medical-aid" className="category">
              <i class="fa-solid fa-suitcase-medical"></i>Medical Aid
            </MenuItem>
            <MenuItem value="women" className="category">
              <i class="fa-solid fa-person-dress"></i>Women
            </MenuItem>
            <MenuItem value="environment" className="category">
              <i class="fa-solid fa-seedling"></i>Environment
            </MenuItem>
            <MenuItem value="others" className="category">
              <i class="fa-solid fa-ellipsis"></i>Others
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Categories;
