const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const incomeRoutes = require("./routes/Income");
const loanRoutes = require("./routes/loan");

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: "https://income-client-9lhp.vercel.app",
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/loan", loanRoutes);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected ");
  app.listen(5000, () => console.log("Server running on http://localhost:5000"));
})
.catch(err => {
  console.error("MongoDB connection error :", err);
});
