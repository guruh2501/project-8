const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const produkRoutes = require("./routes/produkRoutes");

const app = express();
app.use(bodyParser.json());

// Routing utama
app.use("/api/produk", produkRoutes);

// Cek koneksi + Sync DB
sequelize.sync().then(() => {
  console.log("Database connected & synced!");
  app.listen(3000, () => console.log("Server running at http://localhost:3000"));
}).catch(err => {
  console.error("DB Connection error:", err);
});
