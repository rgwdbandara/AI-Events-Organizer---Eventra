
require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const aiRoutes = require("./routes/ai");
const registrationRoutes = require("./routes/registration");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/registrations", registrationRoutes);

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Eventra backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
