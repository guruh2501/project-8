const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_produk", "root", "", {
  host: "localhost",
  dialect: "mysql", // bisa diganti 'postgres' kalau pakai PostgreSQL
});

module.exports = sequelize;
