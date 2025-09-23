const Produk = require("../models/Produk");

// GET /api/produk
exports.getProduk = async (req, res) => {
  try {
    const produk = await Produk.findAll();
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/produk
exports.createProduk = async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    const produk = await Produk.create({ nama, harga, stok });
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/produk/:id
exports.updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga, stok } = req.body;
    const produk = await Produk.findByPk(id);
    if (!produk) return res.status(404).json({ message: "Produk tidak ditemukan" });

    produk.nama = nama;
    produk.harga = harga;
    produk.stok = stok;
    await produk.save();

    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/produk/:id
exports.deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const produk = await Produk.findByPk(id);
    if (!produk) return res.status(404).json({ message: "Produk tidak ditemukan" });

    await produk.destroy();
    res.json({ message: "Produk dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
