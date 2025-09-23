const express = require("express");
const router = express.Router();
const Produk = require("../models/Produk");

// GET /api/statistik
router.get("/", async (req, res) => {
  try {
    // 1. Jumlah total produk
    const totalProduk = await Produk.count();

    // 2. Rata-rata harga produk
    const rataHarga = await Produk.findAll({
      attributes: [[Produk.sequelize.fn("AVG", Produk.sequelize.col("harga")), "avgHarga"]],
      raw: true,
    });

    // 3. Produk dengan stok paling sedikit
    const produkMinStok = await Produk.findOne({
      order: [["stok", "ASC"]],
    });

    res.json({
      totalProduk,
      rataHarga: parseFloat(rataHarga[0].avgHarga),
      produkMinStok,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
