require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI); // DEBUG LOG

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/event"));



// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Eventra backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
