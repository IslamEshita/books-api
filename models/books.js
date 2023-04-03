const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // Title
  title: { type: String, required: true },
  // Description
  description: { type: String },
  // Year
  year: { type: Number },
  // Quantity
  quantity: { type: Number },
  // Image URL
  imageURL: { type: String, default: "http://placekitten.com/350/350" },
});

module.exports = mongoose.model("Book", bookSchema);
