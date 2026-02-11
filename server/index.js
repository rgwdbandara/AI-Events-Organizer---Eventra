require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ai-events-organizer-eventra.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
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

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
