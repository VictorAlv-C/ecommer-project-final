const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(15),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = { Cart };
