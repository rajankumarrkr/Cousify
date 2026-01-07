const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwtHelpers");

// Refresh + access send helper
const sendTokens = async (res, user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // refresh token DB me store
  user.refreshToken = refreshToken;
  await user.save();

  // HTTP-only cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // production: true + HTTPS
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

// ===== REGISTER =====
exports.register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields (name, email, password, role) are required" });
    }

    if (!["student", "instructor"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or instructor" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    const accessToken = await sendTokens(res, user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: accessToken, // Changed from accessToken to token for frontend consistency
    });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// ===== LOGIN =====
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = await sendTokens(res, user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: accessToken, // Changed from accessToken to token for frontend consistency
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// ===== REFRESH ACCESS TOKEN =====
exports.refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser._id.toString() !== decoded.id) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = generateAccessToken(foundUser);

        return res.json({
          token: accessToken, // Changed from accessToken to token for frontend consistency
          user: {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
          },
        });
      }
    );
  } catch (err) {
    console.error("Refresh error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// ===== LOGOUT =====
exports.logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.status(204).end();
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (foundUser) {
      foundUser.refreshToken = null;
      await foundUser.save();
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
