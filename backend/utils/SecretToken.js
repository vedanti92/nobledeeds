require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  console.log("Creating token for id:", id);
  console.log("TOKEN_KEY:", process.env.TOKEN_KEY);
  const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  console.log("Token created:", token);
  return token;
};
