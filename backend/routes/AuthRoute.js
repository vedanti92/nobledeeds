const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/logout", (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  };

  res.clearCookie("token", cookieOptions);
  res.json({ status: true, message: "Logged out successfully" });
});

module.exports = router;
