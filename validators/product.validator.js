const { body } = require("express-validator");
const { validationsResults } = require("../utils/validationResult");

const validationCreateProduct = [
  body("title")
    .notEmpty()
    .withMessage("title property is empty")
    .isString()
    .withMessage("title property muts be a string")
    .isLength({ max: 50 })
    .withMessage("title property must not contain more than 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("description property is empty")
    .isString()
    .withMessage("description property muts be a string")
    .isLength({ max: 150 })
    .withMessage(
      "description property must not contain more than 30 characters"
    ),
  body("quantity")
    .notEmpty()
    .withMessage("quantity property is empty")
    .isNumeric()
    .withMessage("quantity property muts be a number")
    .custom((value) => value > 0)
    .withMessage("quantity property must be greather than 0"),
  body("price")
    .notEmpty()
    .withMessage("price property is empty")
    .isDecimal()
    .withMessage("price property muts be a number")
    .custom((value) => value > 0)
    .withMessage("quantity property must be greather than 0"),
  validationsResults,
];

module.exports = { validationCreateProduct };
