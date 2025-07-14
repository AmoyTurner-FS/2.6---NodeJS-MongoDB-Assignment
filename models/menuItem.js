const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  spicy: {
    type: Boolean,
    default: false,
  },
  availableOn: {
    type: Date,
    default: Date.now,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
