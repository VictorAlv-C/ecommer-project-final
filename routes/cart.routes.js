const express = require("express");

const { validateSession } = require("../middlewares/auth.middleware");
const { findCartActive } = require("../middlewares/cart.middleware");

const {
  addProduct,
  productsInCart,
  updateCart,
  purchaseCart,
} = require("../controllers/cart.controller");

const routes = express.Router();

routes.use(validateSession);

routes.get("/", productsInCart);

routes.post("/add-product", findCartActive, addProduct);

routes.patch("/update-cart", findCartActive, updateCart);

routes.delete("/:productId");

routes.post("/purchase", findCartActive, purchaseCart);

module.exports = { routesCart: routes };
