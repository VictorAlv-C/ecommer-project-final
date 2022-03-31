const { validationResult } = require("express-validator");
const { AppError } = require("./appError");

exports.validationsResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msgError = errors
      .array()
      .map(({ msg }) => msg)
      .join(", ");

    next(new AppError(400, msgError));
  }

  next();
};
