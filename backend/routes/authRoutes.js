const express = require("express");
const rateLimit = require("express-rate-limit");
const authController = require("../controllers/authController");

const router = express.Router();

// ===== Rate limiters =====
const registerLimiter = rateLimit({
  windowMs: 5* 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many sign-up attempts. Please try again 5 minutes later." },
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again 5 minutes later." },
});

// ===== Routes =====
router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/refresh", authController.refresh);

router.post("/logout", authController.logout);

module.exports = router;
