const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  orderCreation,
  countOrdersMiddleware,
  generateRandomCode,
  createDiscount,
  getDiscountMiddleware,
  updateDiscountMiddleware,
  getAllDiscountMiddleware,
  getTotalAmount,

  getAllPurchaseMiddleware,
} = require("./orderHelper");
const { cartUpdate } = require("../product/productHelper");
const { validateOrder } = require("../../models/order");
const { validateDiscount } = require("../../models/discount");

// @desc Create new order
// @route POST /order
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { cartIds, amount, quantity, code } = req.body;

  let amountAfterDiscount = amount;
  let totalDiscount = 0;

  if (code) {
    const discount = await getDiscountMiddleware({ is_valid: true, code });

    if (discount) {
      totalDiscount = amount * 0.1;
      amountAfterDiscount = amount - totalDiscount;
      const updateDiscount = await updateDiscountMiddleware(
        discount.id,
        session
      );
      if (!updateDiscount) {
        res.status(400);
        throw new Error(
          "Discount could not be updated. Rollback occur during upadting Discount"
        );
      }
    }
  }

  const orderData = {
    cart_id: cartIds,
    discount: totalDiscount,
    amount: amountAfterDiscount,
    quantity,
  };
  try {
    const updateCart = await cartUpdate(
      orderData.cart_id,
      { is_check_out: true },
      session
    );
    if (!updateCart) {
      res.status(400);
      throw new Error(
        "Cart could not be updated. Rollback occur during upadting Cart"
      );
    }

    if (orderData) {
      const { error } = validateOrder(orderData);
      if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
      }
    }

    // Create the main order
    const orderDetail = await orderCreation(orderData, session);

    if (!orderDetail) {
      throw new Error(`Order could not be created .`);
    }

    await session.commitTransaction();

    return res.status(200).json({ message: "Order created successfully!" });
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

// @desc Create discount code
// @route POST /discount
// @access Private
const createDiscountCode = asyncHandler(async (req, res) => {
  try {
    let discount = "";

    // const validDiscount = await getDiscountMiddleware({ is_valid: true });

    // if (validDiscount) discount = validDiscount.code;

    // if (!discount) {
    const noOfOrder = await countOrdersMiddleware();
    const isNthOrder = noOfOrder % 5;

    if (!isNthOrder) {
      const code = generateRandomCode(5);
      const data = {
        code,
      };
      if (data) {
        const { error } = validateDiscount(data);
        if (error) {
          res.status(400);
          throw new Error(error.details[0].message);
        }
      }

      const response = await createDiscount(data);

      if (!response) {
        throw new Error(`Discount Code could not be created .`);
      }
      discount = response.code;
      return res.status(200).json({ discount });
    }
    // }

    // return res.status(200).json({ discount });
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
          ? "Something went wrong in creating discount code: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get Discounts data
// @route GET /discountList
// @access Private
const getAllDiscount = asyncHandler(async (req, res) => {
  try {
    //get all products
    const discount = await getAllDiscountMiddleware();

    if (!discount) {
      res.status(400);
      throw new Error("No discounts found");
    }

    res.status(200).json({
      discountList: discount,
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
          ? "Something went wrong while fetching discount: "
          : ""
      }${error.message}`
    );
  }
});
// @desc Get Total amount data
// @route GET /total
// @access Private
const totalAmount = asyncHandler(async (req, res) => {
  try {
    //get all products
    const amount = await getTotalAmount();

    if (!amount) {
      res.status(400);
      throw new Error("No amount found");
    }

    res.status(200).json({
      amount,
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
          ? "Something went wrong while fetching amount: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get purchase data
// @route GET /purchase
// @access Private
const getAllPurchase = asyncHandler(async (req, res) => {
  try {
    const purchase = await getAllPurchaseMiddleware();

    if (!purchase) {
      res.status(400);
      throw new Error("No purchases found");
    }
    const total = await getTotalAmount();

    res.status(200).json({
      purchaseList: purchase,
      total,
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
          ? "Something went wrong while fetching discount: "
          : ""
      }${error.message}`
    );
  }
});

module.exports = {
  createOrder,
  createDiscountCode,
  getAllDiscount,
  totalAmount,
  getAllPurchase,
};
