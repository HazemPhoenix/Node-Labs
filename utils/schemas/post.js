const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(10).max(100).required().messages({
    "any.required": "Post title is required",
    "string.min": "Post title must be 10 characters minimum",
    "string.max": "Post title must be 100 characters maximum",
    "string.base": "Password must be a string",
  }),

  content: Joi.string().min(10).max(10000).required().messages({
    "any.required": "Post content is required",
    "string.min": "Post content must be 10 characters minimum",
    "string.max": "Post content must be 10000 (~1600 words) characters maximum",
    "string.base": "Post content must be a string",
  }),
});

module.exports = schema;
