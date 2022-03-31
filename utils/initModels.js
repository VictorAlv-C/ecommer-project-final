const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const { ProductsInCart } = require("../models/productsInCart");
const { Order } = require("../models/order.model");

const initModels = () => {
  User.hasMany(Product);
  Product.belongsTo(User);

  Product.hasOne(ProductsInCart);
  ProductsInCart.belongsTo(Product);

  Cart.hasMany(ProductsInCart);
  ProductsInCart.belongsTo(Cart);

  User.hasOne(Cart);
  Cart.belongsTo(User);

  Cart.hasOne(Order);
  Order.belongsTo(Cart);

  User.hasMany(Order);
  Order.belongsTo(User);
};

module.exports = { initModels };
