// models/Loan.js
const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  duration: Number,
  interestRate: Number,
  totalInterest: Number,
  totalPayable: Number,
  paidAmount: Number,
  remainingAmount: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Loan", loanSchema);
