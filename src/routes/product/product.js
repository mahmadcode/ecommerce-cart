const express = require("express");
const { body } = require("express-validator");

const {
  createProduct,
  getAllProducts,
  addToCart,
  getProductDetail,
  getCart,
} = require("../../controllers/product/productController");
const { protect } = require("../../middleware/authMiddleware");

const route = express.Router();

route.get("/", protect, getAllProducts);
route.get("/cart", protect, getCart);
route.get("/:id", protect, getProductDetail);

route.post("/", protect, createProduct);

route.post("/addtocart", protect, addToCart);

module.exports = route;
