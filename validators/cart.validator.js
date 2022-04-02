const { body } = require("express-validator");
const { validationsResults } = require("../utils/validationResult");

exports.validationAddPRoduct = [
  body("quantity")
    .notEmpty()
    .withMessage("quantity property is empty")
    .isNumeric()
    .withMessage("quantity property muts be a number")
    .custom((value) => value > 0)
    .withMessage("quantity property must be greater than 0"),
  body("productId")
    .notEmpty()
    .withMessage("producId property is empty")
    .isNumeric()
    .withMessage("producId property muts be a number")
    .custom((value) => value > 0)
    .withMessage("producId property must be greater than 0"),
  validationsResults,
];

exports.validationUpdateProduct = [
  body("newQty")
    .notEmpty()
    .withMessage("newQty property is empty")
    .isNumeric()
    .withMessage("newQty property muts be a number")
    .custom((value) => value > 0)
    .withMessage("newQty property must be greater than 0"),
  body("productId")
    .notEmpty()
    .withMessage("producId property is empty")
    .isNumeric()
    .withMessage("producId property muts be a number")
    .custom((value) => value > 0)
    .withMessage("producId property must be greater than 0"),
  validationsResults,
];
