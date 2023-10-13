const mongoose = require("mongoose");
const Joi = require("joi");
// Define a schema for Discount
const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    is_valid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//joi validation
function validateDiscount(discount) {
  const schema = Joi.object({
    code: Joi.string().max(50).required(),
    is_valid: Joi.boolean(),
  });
  return schema.validate(discount);
}

// Create a Mongoose model for Discount
const Discount = mongoose.model("Discount", discountSchema);

module.exports = {
  Discount,
  validateDiscount,
};
