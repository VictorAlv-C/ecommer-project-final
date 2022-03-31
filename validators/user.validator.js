const { body } = require("express-validator");
const { User } = require("../models/user.model");
const { validationsResults } = require("../utils/validationResult");

const validationCreateUser = [
  body("username")
    .notEmpty()
    .withMessage("username property is empty")
    .isString()
    .withMessage("username property muts be a string")
    .isLength({ max: 30 })
    .withMessage("username property must not contain more than 30 characters"),
  body("email")
    .notEmpty()
    .withMessage("email property is empty")
    .isString()
    .withMessage("email property muts be a string")
    .isLength({ max: 50 })
    .withMessage("email property must not contain more than 50 characters")
    .isEmail()
    .withMessage("email property must be a Email valid")
    .custom(async (value) => {
      const user = await User.findOne({
        where: { email: value, status: "active" },
      });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password property is empty")
    .isString()
    .withMessage("password property muts be a string"),
  validationsResults,
];

module.exports = { validationCreateUser };
