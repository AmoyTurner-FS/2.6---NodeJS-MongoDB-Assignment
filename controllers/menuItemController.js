const MenuItem = require("../models/menuItem");

exports.getAllMenuItems = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const exclude = ["select", "sort", "page", "limit"];
    exclude.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    const filters = JSON.parse(queryStr);

    let query = MenuItem.find(filters).populate("restaurant");

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("availableOn");
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const items = await query;
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate("restaurant");
    if (!item) return res.status(404).json({ error: "Not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT
exports.updateMenuItem = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteMenuItem = async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
