const mongoose = require("mongoose");
const Joi = require("joi");
// Define a schema for Orders
const orderSchema = new mongoose.Schema(
  {
    cart_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddToCart",
        required: true,
      },
    ],

    discount: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//joi validation
function validateOrder(order) {
  const schema = Joi.object({
    cart_id: Joi.array().items(Joi.string().max(50).required()),
    quantity: Joi.number().required(),
    discount: Joi.number(),
    amount: Joi.number(),
  });
  return schema.validate(order);
}

// Create a Mongoose model for Orders
const Orders = mongoose.model("Orders", orderSchema);

module.exports = {
  Orders,
  validateOrder,
};
