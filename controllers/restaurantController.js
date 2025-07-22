const Restaurant = require("../models/restaurant");

exports.getAllRestaurants = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    ["select", "sort", "page", "limit"].forEach((f) => delete queryObj[f]);

    // stringify & inject
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$$${match}`
    );
    const filters = JSON.parse(queryStr);

    // build mongoose query
    let query = Restaurant.find(filters);

    // field selection
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt"); // default
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // execute
    const restaurants = await query;
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /restaurants/:id
exports.getRestaurantById = async (req, res) => {
  try {
    const rest = await Restaurant.findById(req.params.id);
    if (!rest) return res.status(404).json({ error: "Not found" });
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /restaurants
exports.createRestaurant = async (req, res) => {
  try {
    const newRest = await Restaurant.create(req.body);
    res.status(201).json({ message: "Created", id: newRest._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /restaurants/:id
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /restaurants/:id
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
