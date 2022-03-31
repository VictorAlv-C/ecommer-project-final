const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");

const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { ProductsInCart } = require("../models/productsInCart");

const validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError(401, "Invalid Session"));

  const verifedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: verifedToken.id, status: "active" },
    attributes: { exclude: ["password"] },
    include: [{ model: Cart, include: [{ model: ProductsInCart }] }],
  });

  if (!user) return next(new AppError(401, "Invalid Session"));

  req.currentUser = user;

  next();
});

module.exports = { validateSession };
