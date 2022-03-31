const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  issuedAtt: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.STRING(10),
    defaultValue: "true",
    allowNull: false,
  },
});

module.exports = { Order };
