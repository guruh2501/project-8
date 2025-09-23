const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Produk = sequelize.define("Produk", {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Produk;
