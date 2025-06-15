const AppError = require("../utils/AppError");

const JoiValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      const err = error.details[0].message;
      throw new AppError(err, 400);
    }
    next();
  };
};

module.exports = JoiValidator;
