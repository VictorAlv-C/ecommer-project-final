const { Product } = require("../models/product.model");
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price } = req.body;

  const product = await Product.create({
    title,
    description,
    quantity,
    price,
    userId: req.currentUser.id,
  });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  const dataProduct = filterObj(
    req.body,
    "title",
    "description",
    "quantity",
    "price"
  );

  await product.update({ ...dataProduct });

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "deleted" });

  res.status(200).json({
    status: "success",
    msg: "Product deleted",
  });
});
