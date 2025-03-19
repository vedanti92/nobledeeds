import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setCategory("");
  }, []);

  return (
    <div className="container">
      <Box>
        <FormControl sx={{ width: 160}}>
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
              <i class="fa-solid fa-layer-group"></i> &nbsp; All
            </MenuItem>
            <MenuItem value="disaster-relief" className="category">
              <i class="fa-solid fa-house-crack"></i> &nbsp; Disaster Relief
            </MenuItem>
            <MenuItem value="food-assistance" className="category">
              <i class="fa-solid fa-utensils"></i> &nbsp; Food Assistance
            </MenuItem>
            <MenuItem value="education" className="category">
              <i class="fa-solid fa-chalkboard-user"></i> &nbsp; Education
            </MenuItem>
            <MenuItem value="animals" className="category">
              <i class="fa-solid fa-paw"></i> &nbsp; Animals
            </MenuItem>
            <MenuItem value="children" className="category">
              <i class="fa-solid fa-child"></i> &nbsp; Children
            </MenuItem>
            <MenuItem value="senior-care" className="category">
              <i class="fa-solid fa-person-cane"></i> &nbsp; Senior Care
            </MenuItem>
            <MenuItem value="specially-abled" className="category">
              <i class="fa-solid fa-wheelchair"></i> &nbsp; Specially Abled
            </MenuItem>
            <MenuItem value="medical-aid" className="category">
              <i class="fa-solid fa-suitcase-medical"></i> &nbsp; Medical Aid
            </MenuItem>
            <MenuItem value="women" className="category">
              <i class="fa-solid fa-person-dress"></i> &nbsp; Women
            </MenuItem>
            <MenuItem value="environment" className="category">
              <i class="fa-solid fa-seedling"></i> &nbsp; Environment
            </MenuItem>
            <MenuItem value="others" className="category">
              <i class="fa-solid fa-ellipsis"></i> &nbsp; Others
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default Categories;
