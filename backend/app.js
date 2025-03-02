require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const url = process.env.MONGO_URL;
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  mongoose.connect(url);
  console.log("DB connected");
});
