require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const restaurantRoutes = require("./routes/restaurants");
const menuItemRoutes = require("./routes/menu-items");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("🗄️  Connected to MongoDB"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

const app = express();
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/menu-items", menuItemRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀  Server on port ${port}`));
