const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
