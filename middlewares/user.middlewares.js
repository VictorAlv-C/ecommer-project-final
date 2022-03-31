const { User } = require("../models/user.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.findUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) return next(new AppError(400, "Cant get User with given Id"));

  req.user = user;

  next();
});

exports.onlyAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (+id !== req.currentUser.id)
    return next(new AppError(403, "Permissions denied for the given account"));

  next();
});
