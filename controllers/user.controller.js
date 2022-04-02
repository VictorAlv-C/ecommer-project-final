const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");

const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");
const { Cart } = require("../models/cart.model");
const { ProductsInCart } = require("../models/productsInCart");

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const passEncript = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: passEncript,
  });

  user.password = undefined;

  res.status(200).json({
    status: "Success",
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const dataUser = filterObj(req.body, "username", "email");

  await user.update({ ...dataUser });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.deleteUSer = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(200).json({
    status: "Success",
    msg: "User deleted",
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError(400, "Invalid Email/Password"));

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  res.status(200).json({
    status: "User Validated",
    data: { token },
  });
});

exports.getAllProductsByUser = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { userId: req.currentUser.id, status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({ where: { userId: req.currentUser.id } });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, userId: req.currentUser.id },
    attributes: ["id", "issuedAtt", "totalPrice", "status"],
    include: {
      model: Cart,
      attributes: ["id", "status"],
      include: [
        {
          model: ProductsInCart,
          attributes: ["id", "quantity", "status"],
          include: [
            {
              model: Product,
              attributes: ["id", "title", "description", "price"],
            },
          ],
        },
      ],
    },
  });

  if (!order) return next(new AppError(404, "Catn get order with given Id"));

  res.status(200).json({
    status: "success",
    data: { order },
  });
});
