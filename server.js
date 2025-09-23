const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const produkRoutes = require("./routes/produkRoutes");
const axios = require("axios");


const app = express();
app.use(bodyParser.json());


// Setting EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routing API
app.use("/api/produk", produkRoutes);

// Routing UI
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/produk");
    const produk = response.data;
    res.render("index", { produk });
  } catch (err) {
    res.render("index", { produk: [] });
  }
});

// Sync DB
sequelize.sync().then(() => {
  console.log("Database connected & synced!");
  app.listen(3000, () => console.log("Server running at http://localhost:3000"));
}).catch(err => {
  console.error("DB Connection error:", err);
});
