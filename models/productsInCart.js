const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const ProductsInCart = sequelize.define("productsInCart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(15),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = { ProductsInCart };
