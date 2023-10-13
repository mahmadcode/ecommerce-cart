const mongoose = require("mongoose");
const Joi = require("joi");
// Define a schema for AddToCart
const addToCartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User model (if your application has user authentication)
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products", // Reference to the Product model
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    is_check_out: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

function validateAddToCart(addToCart) {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().required(),
    user_id: Joi.string().required(),
    is_check_out: Joi.boolean(),
  });
  return schema.validate(addToCart);
}

// Create the Mongoose model for AddToCart
const AddToCart = mongoose.model("AddToCart", addToCartSchema);

module.exports = {
  AddToCart,
  validateAddToCart,
};
