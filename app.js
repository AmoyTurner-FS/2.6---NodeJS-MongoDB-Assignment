require("dotenv").config();
// init
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurants");
const menuItemRoutes = require("./routes/menu-items");

connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // allow cross

// routes
app.use("/restaurants", restaurantRoutes);
app.use("/menu-items", menuItemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`)); // listen
