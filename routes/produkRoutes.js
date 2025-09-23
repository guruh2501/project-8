const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produkController");
const Produk = require("../models/Produk");
const { Op } = require("sequelize");

router.get("/", produkController.getProduk);
router.post("/", produkController.createProduk);
router.put("/:id", produkController.updateProduk);
router.delete("/:id", produkController.deleteProduk);

// GET /api/produk/search?stokMax=10
router.get("/search", async (req, res) => {
  try {
    const { stokMax } = req.query;

    const whereClause = {};
    if (stokMax) whereClause.stok = { [Op.lte]: stokMax }; // <= stokMax

    const produk = await Produk.findAll({ where: whereClause });

    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
