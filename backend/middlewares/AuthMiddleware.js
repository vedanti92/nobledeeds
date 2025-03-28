const User = require("../models/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(data.id);
    if (user) {
      req.user = user;
      return res.json({ status: true, user: user.username });
    }
    return res.json({ status: false });
  } catch (err) {
    return res.json({ status: false });
  }
};
