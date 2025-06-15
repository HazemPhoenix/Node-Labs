const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "Name is required",
    "string.min": "Name must be 3 characters or more",
    "string.max": "Name must be less than or equal to 30 characters",
    "string.base": "Name must be a string",
  }),

  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email address is not valid",
    "string.base": "Email must be a string",
  }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must be 8-30 characters long and contain only letters and numbers",
      "string.base": "Password must be a string",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": "Password confirmation is required",
    "any.only": "Passwords do not match",
    "string.base": "Password Confirmation must be a string",
  }),
});

module.exports = schema;
