const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: Number,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Income", incomeSchema);
