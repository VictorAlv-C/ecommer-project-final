const express = require("express");
const {
  getUserById,
  createUser,
  updateUser,
  deleteUSer,
  loginUser,
  getAllProductsByUser,
  getAllOrders,
  getOrderById,
} = require("../controllers/user.controller");

const { validateSession } = require("../middlewares/auth.middleware");
const {
  findUser,
  onlyAccountOwner,
} = require("../middlewares/user.middlewares");

const { validationCreateUser } = require("../validators/user.validator");

const route = express.Router();

route.post("/", validationCreateUser, createUser);

route.post("/login", loginUser);

route.use(validateSession);

route.get("/me", getAllProductsByUser);

route.get("/orders", getAllOrders);
route.get("/orders/:id", getOrderById);

route
  .use("/:id", findUser)
  .route("/:id")
  .get(onlyAccountOwner, getUserById)
  .patch(onlyAccountOwner, updateUser)
  .delete(onlyAccountOwner, deleteUSer);

module.exports = { routesUser: route };
