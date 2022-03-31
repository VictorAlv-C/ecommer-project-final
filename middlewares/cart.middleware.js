const { Cart } = require("../models/cart.model");
const { ProductsInCart } = require("../models/productsInCart");
const { catchAsync } = require("../utils/catchAsync");

exports.findCartActive = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    where: { userId: req.currentUser.id, status: "active" },
    include: [{ model: ProductsInCart }],
  });

  req.cart = cart;

  next();
});
