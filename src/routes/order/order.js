const express = require("express");
const { body } = require("express-validator");

const {
  createOrder,
  createDiscountCode,
  getAllDiscount,
  totalAmount,
  getAllPurchase,
} = require("../../controllers/order/orderController");
const { protect } = require("../../middleware/authMiddleware");

const route = express.Router();

route.get("/discount-code", protect, createDiscountCode);
route.get("/discountList", protect, getAllDiscount);
route.get("/purchase", protect, getAllPurchase);
route.get("/total", protect, totalAmount);

route.post("/", protect, createOrder);

module.exports = route;
