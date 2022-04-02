const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");
const { ProductsInCart } = require("../models/productsInCart");
const { Order } = require("../models/order.model");

const { AppError } = require("../utils/appError");

const { catchAsync } = require("../utils/catchAsync");

exports.addProduct = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { cart, currentUser } = req;

  const product = await Product.findOne({
    where: { id: productId, status: "active" },
  });

  if (!product) {
    return next(
      new AppError(
        404,
        "The added product does not exist or has been eliminated"
      )
    );
  }

  if (quantity > product.quantity) {
    return next(
      new AppError(400, "The quantity of products exceeds the existence")
    );
  }

  if (!cart) {
    const newCart = await Cart.create({ userId: currentUser.id });
    await ProductsInCart.create({
      cartId: newCart.id,
      productId,
      quantity,
    });
  } else {
    const findProduct = await ProductsInCart.findOne({
      where: { productId, cartId: cart.id },
    });

    if (findProduct && findProduct.status === "active") {
      return next(new AppError(400, "This product ready exist in the cart"));
    }

    if (findProduct && findProduct.status === "removed") {
      await findProduct.update({
        status: "active",
        quantity,
      });
    }

    if (!findProduct) {
      await ProductsInCart.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }
  }

  res.status(201).json({
    status: "success",
    message: "Product added to cart",
  });
});

exports.productsInCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    where: { userId: req.currentUser.id, status: "active" },
    attributes: [["id", "Cart Id"], "userId", "status"],
    include: [
      {
        model: ProductsInCart,
        attributes: ["id", "quantity", "status", ["productId", "Product-Id"]],
        include: [
          {
            model: Product,
            attributes: {
              exclude: [
                "id",
                "quantity",
                "userId",
                "status",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
      },
    ],
  });

  if (!cart) return next(new AppError(400, "Cart is Empty"));

  res.status(200).json({
    status: "success",
    data: { cart },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { productId, newQty } = req.body;
  const { cart } = req;

  if (!cart)
    return next(new AppError(400, "There aren't products in the cart"));

  const product = await Product.findOne({
    where: { id: productId, status: "active" },
  });

  if (!product) {
    return next(
      new AppError(404, "The product does not exist or has been eliminated")
    );
  }

  const idProducts = cart.productsInCarts.map((product) => product.productId);

  if (!idProducts.includes(productId)) {
    return next(new AppError(400, "The product does not exist in the cart"));
  }

  if (newQty > product.quantity) {
    return next(
      new AppError(400, "The new quantity of products exceeds the existence")
    );
  }

  const productInCart = await ProductsInCart.findOne({
    where: { cartId: cart.id, productId },
  });

  newQty === 0
    ? await productInCart.update({ quantity: newQty, status: "removed" })
    : await productInCart.update({ quantity: newQty, status: "active" });

  res.status(200).json({
    status: "Success",
    message: "Product Updated",
    data: { productInCart },
  });
});

exports.removeCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!cart)
    return next(new AppError(400, "There aren't products in the cart"));

  const productInCart = await ProductInCart.findOne({
    where: { status: "active", cartId: cart.id, productId },
  });

  if (!productInCart) {
    return next(new AppError(404, "This product does not exist in this cart"));
  }

  await productInCart.update({ status: "removed", quantity: 0 });

  res.status(204).json({ status: "success", message: "Product removed" });
});

exports.purchaseCart = catchAsync(async (req, res, next) => {
  const { currentUser, cart } = req;

  if (!cart) return next(new AppError(400, "Cart is Empty"));

  let totalPrice = 0;

  const cartPromises = cart.productsInCarts.map(async (productInCart) => {
    if (productInCart.status === "active") {
      const product = await Product.findOne({
        where: { id: productInCart.productId },
      });

      const totalPriceProduct = productInCart.quantity * product.price;
      totalPrice += totalPriceProduct;

      const newExistence = product.quantity - productInCart.quantity;
      await product.update({ quantity: newExistence });

      return await productInCart.update({ status: "purchased" });
    }
  });

  await Promise.all(cartPromises);

  const order = await Order.create({
    issuedAtt: new Date().toString().substring(0, 24),
    userId: currentUser.id,
    cartId: cart.id,
    totalPrice,
  });

  await cart.update({ status: "purchased" });

  res.status(200).json({
    status: "success",
    message: "Cart purchased",
    data: { order },
  });
});
