const express = require("express");

const { AppError } = require("./utils/appError");
const { globalHandlerError } = require("./controllers/error.controller");

const { routesUser } = require("./routes/user.routes");
const { routesProducts } = require("./routes/product.routes");
const { routesCart } = require("./routes/cart.routes");

const app = express();
app.use(express.json());

app.use("/api/v1/users", routesUser);
app.use("/api/v1/products", routesProducts);
app.use("/api/v1/cart", routesCart);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} is no found in this server`));
});

app.use(globalHandlerError);

module.exports = { app };
