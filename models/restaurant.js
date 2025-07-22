const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
