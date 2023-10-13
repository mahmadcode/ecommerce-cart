const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  productCreation,
  getAllProductsMiddleware,
  getProductMiddleware,
  getProductById,
  updateProductMiddleware,
  addToCartMiddleware,
  getAllCartsMiddleware,
  getOrderQuantity,
} = require("./productHelper");

const {
  getAllDiscountMiddleware,
  createDiscountCodeMiddleware,
} = require("../order/orderHelper");
const { validateProduct } = require("../../models/products");
const { validateAddToCart } = require("../../models/addToCart");

// @desc Create new product
// @route POST /product
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  if (!req.result.is_admin) {
    res.status(400);
    throw new Error("You are not allowed to perform this action");
  }

  const prodectData = req.body;

  if (prodectData) {
    const { error } = validateProduct(prodectData);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
  }

  try {
    // Create the main product
    const productDetail = await productCreation(prodectData);

    if (!productDetail) {
      throw new Error(`Product could not be created .`);
    }

    return res.status(200).json({ message: "Product created successfully!" });
  } catch (error) {
    res.status(
      error.statusCode
        ? error.statusCode
        : res.statusCode
        ? res.statusCode
        : 500
    );
    throw new Error(
      `${
        error.statusCode !== 400 && res.statusCode !== 400
          ? "Something went wrong in user creation: "
          : ""
      }${error.message}`
    );
  }
});
// @desc Addd to cart
// @route POST /product/addtocart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = req.body;

    const productData = await getProductById(product.product_id);

    if (!productData) {
      res.status(400);
      throw new Error("No products found");
    }

    const newQuantity =
      parseInt(productData.quantity, 10) - parseInt(product.quantity, 10);

    const updateProduct = await updateProductMiddleware(
      productData.id,
      { quantity: newQuantity },
      session
    );
    if (!updateProduct) {
      res.status(400);
      throw new Error(
        "Product could not be updated. Rollback occur during upadting Product"
      );
    }

    const cartData = { user_id: req.result._id, ...product };

    if (cartData) {
      const { error } = validateAddToCart(cartData);
      if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
      }
    }

    const createdCart = await addToCartMiddleware(cartData, session);
    if (!createdCart) {
      res.status(400);
      throw new Error(
        "Cart could not be created. Rollback occur during creating Cart"
      );
    }
    await session.commitTransaction();

    return res.status(200).json({ message: "Add to cart successfully!" });
  } catch (error) {
    await session.abortTransaction();
    res.status(
      error.statusCode
        ? error.statusCode
        : res.statusCode
        ? res.statusCode
        : 500
    );
    throw new Error(
      `${
        error.statusCode !== 400 && res.statusCode !== 400
          ? "Something went wrong in user creation: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get products data
// @route GET /product
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    //get all products
    const products = await getAllProductsMiddleware();

    if (!products) {
      res.status(400);
      throw new Error("No products found");
    }

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(
      error.statusCode
        ? error.statusCode
        : res.statusCode
        ? res.statusCode
        : 500
    );
    throw new Error(
      `${
        error.statusCode !== 400 && res.statusCode !== 400
          ? "Something went wrong while fetching products: "
          : ""
      }${error.message}`
    );
  }
});
// @desc Get Cart data
// @route GET /cart
// @access Private
const getCart = asyncHandler(async (req, res) => {
  const userId = req.result._id;

  try {
    //get all products
    const cartList = await getAllCartsMiddleware(userId);

    if (!cartList) {
      res.status(400);
      throw new Error("No cart found");
    }

    const isNthOrder = await getOrderQuantity(userId);
    let discount = "";

    if (isNthOrder[0]?.quantity >= 5) {
      const coupon = await getAllDiscountMiddleware({ is_valid: true });

      if (coupon.length) {
        discount = coupon[0].code;
      } else {
        const code = await createDiscountCodeMiddleware();
        discount = code;
      }
    }

    res.status(200).json({
      cartList,
      discount,
    });
  } catch (error) {
    res.status(
      error.statusCode
        ? error.statusCode
        : res.statusCode
        ? res.statusCode
        : 500
    );
    throw new Error(
      `${
        error.statusCode !== 400 && res.statusCode !== 400
          ? "Something went wrong while fetching Cart: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get product data by id
// @route GET /product/id
// @access Private
const getProductDetail = asyncHandler(async (req, res) => {
  try {
    //get all products
    const products = await getProductMiddleware(req.params.id);

    if (!products) {
      res.status(400);
      throw new Error("No product found");
    }

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(
      error.statusCode
        ? error.statusCode
        : res.statusCode
        ? res.statusCode
        : 500
    );
    throw new Error(
      `${
        error.statusCode !== 400 && res.statusCode !== 400
          ? "Something went wrong while fetching product: "
          : ""
      }${error.message}`
    );
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetail,
  addToCart,
  getCart,
};
