const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], default: "male" },
  role: { type: String, enum: ["admin", "..."], default: "..." },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
