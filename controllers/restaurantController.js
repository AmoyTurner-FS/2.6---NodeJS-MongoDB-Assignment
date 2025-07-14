const Restaurant = require("../models/restaurant");

// GET /restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const list = await Restaurant.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /restaurants/:id
exports.getRestaurantById = async (req, res) => {
  try {
    const rest = await Restaurant.findById(req.params.id);
    if (!rest) return res.status(404).json({ error: "Not found" });
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /restaurants
exports.createRestaurant = async (req, res) => {
  try {
    const newRest = new Restaurant(req.body);
    await newRest.save();
    res.status(201).json(newRest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /restaurants/:id
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /restaurants/:id
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
