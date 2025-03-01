import React from "react";
import "./Categories.css"

function Categories() {
  return (
    <div class="categories my-3">
      <a href="/?category=all" class="category">
        <i class="fa-solid fa-layer-group"></i>
        <span>All</span>
      </a>
      <a href="/?category=disaster-relief" class="category">
        <i class="fa-solid fa-house-crack"></i>
        <span>Disaster Relief</span>
      </a>
      <a href="/?category=food-assistance" class="category">
        <i class="fa-solid fa-utensils"></i>
        <span>Food Assistance</span>
      </a>
      <a href="/?category=education" class="category">
        <i class="fa-solid fa-chalkboard-user"></i>
        <span>Education</span>
      </a>
      <a href="/?category=animals" class="category">
        <i class="fa-solid fa-paw"></i>
        <span>Animals</span>
      </a>
      <a href="/?category=children" class="category">
        <i class="fa-solid fa-child"></i>
        <span>Children</span>
      </a>
      <a href="/?category=senior-care" class="category">
        <i class="fa-solid fa-person-cane"></i>
        <span>Senior Care</span>
      </a>
      <a href="/?category=specially-abled" class="category">
        <i class="fa-solid fa-wheelchair"></i>
        <span>Specially Abled</span>
      </a>
      <a href="/?category=medical-aid" class="category">
        <i class="fa-solid fa-suitcase-medical"></i>
        <span>Medical Aid</span>
      </a>
      <a href="/?category=women" class="category">
        <i class="fa-solid fa-person-dress"></i>
        <span>Women</span>
      </a>
      <a href="/?category=environment" class="category">
        <i class="fa-solid fa-seedling"></i>
        <span>Environment</span>
      </a>
      <a href="/?category=others" class="category">
        <i class="fa-solid fa-ellipsis"></i>
        <span>Others</span>
      </a>
    </div>
  );
}

export default Categories;
