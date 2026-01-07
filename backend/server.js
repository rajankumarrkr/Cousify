// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ----- Global middlewares -----
app.use(helmet());               // security headers
app.use(express.json());         // JSON body parser
app.use(cookieParser());         // read/write cookies

// CORS (important for refresh token cookie)
app.use(
  cors({
    origin: ["http://localhost:5173"], // apna React frontend origin
    credentials: true,                // cookies allow
  })
);

// ----- Routes -----
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// ----- Health check -----
app.get("/", (req, res) => {
  res.json({ message: "Coursify API running" });
});

// ----- DB connect + server start -----
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
