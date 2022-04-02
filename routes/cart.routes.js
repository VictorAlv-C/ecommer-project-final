const express = require("express");

const { validateSession } = require("../middlewares/auth.middleware");
const { findCartActive } = require("../middlewares/cart.middleware");

const {
  validationAddPRoduct,
  validationUpdateProduct,
} = require("../validators/cart.validator");

const {
  addProduct,
  productsInCart,
  updateCart,
  purchaseCart,
  removeCart,
} = require("../controllers/cart.controller");

const routes = express.Router();

routes.use(validateSession);

routes.get("/", productsInCart);

routes.use(findCartActive);

routes.post("/add-product", validationAddPRoduct, addProduct);

routes.patch("/update-cart", validationUpdateProduct, updateCart);

routes.delete("/:cartId", removeCart);

routes.post("/purchase", purchaseCart);

module.exports = { routesCart: routes };
