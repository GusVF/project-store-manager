const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const nameSchema = Joi.string().min(5).required();

const addSalesSchema = Joi.object({
  productId: Joi.number().integer().min(1).required()
    .label('productId'),
  quantity: Joi.number().integer().min(1).required()
    .label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to {{#limit}}',
  'any.empty': '{{#label}} is required',
});

module.exports = {
  idSchema,
  nameSchema,
  addSalesSchema,
};
