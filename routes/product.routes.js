const express = require("express");

const { validateSession } = require("../middlewares/auth.middleware");
const {
  findProduct,
  accountOwner,
} = require("../middlewares/product.middleware");

const { validationCreateProduct } = require("../validators/product.validator");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/product.controller");

const routes = express.Router();

routes.use(validateSession);

routes
  .route("/")
  .get(getAllProducts)
  .post(validationCreateProduct, createProduct);

routes
  .use("/:id", findProduct)
  .route("/:id")
  .get(getProductById)
  .patch(accountOwner, updateProduct)
  .delete(accountOwner, deleteProduct);

module.exports = { routesProducts: routes };
