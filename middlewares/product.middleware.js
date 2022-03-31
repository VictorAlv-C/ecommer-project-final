const { Product } = require("../models/product.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.findProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ where: { id, status: "active" } });

  if (!product)
    return next(new AppError(400, "Cant get product with given Id"));

  req.product = product;

  next();
});

exports.accountOwner = catchAsync(async (req, res, next) => {
  const { product, currentUser } = req;

  if (product.userId !== currentUser.id)
    return next(new AppError(403, "Permissions denied for the given product"));

  next();
});
