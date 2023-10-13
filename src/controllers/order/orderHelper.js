const { Orders } = require("../../models/order");
const { Discount } = require("../../models/discount");
const { validateDiscount } = require("../../models/discount");

const orderCreation = async (orderDetail, session) => {
  try {
    const result = await Orders.create([orderDetail], { session: session });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

async function createDiscount(discountDetails) {
  try {
    const result = new Discount(discountDetails);
    const discount = await result.save();
    return discount;
  } catch (error) {
    throw new Error(error);
  }
}

const getDiscountMiddleware = (condition) => {
  return Discount.findOne(condition)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getAllDiscountMiddleware = (condition = {}) => {
  return Discount.find(condition)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getAllPurchaseMiddleware = () => {
  return Orders.aggregate([
    // {
    //   $lookup: {
    //     from: "addtocarts",
    //     localField: "cart_id",
    //     foreignField: "_id",
    //     as: "carts",
    //   },
    // },
    // {
    //   $unwind: "$carts",
    // },
    // {
    //   $lookup: {
    //     from: "products",
    //     localField: "carts.product_id",
    //     foreignField: "_id",
    //     as: "carts.productData",
    //   },
    // },
    {
      $group: {
        _id: "$_id",
        cart_id: { $first: "$cart_id" },
        amount: { $first: "$amount" },
        quantity: { $first: "$quantity" },
      },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const countOrdersMiddleware = () => {
  return Orders.countDocuments({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }

  return randomCode;
}

const updateDiscountMiddleware = (id, session) => {
  return Discount.findByIdAndUpdate(id, { is_valid: false })
    .session(session)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getTotalAmount = () => {
  return Orders.aggregate([
    {
      $group: {
        _id: null,
        totalPurchase: { $sum: "$amount" },
        totalDiscount: { $sum: "$discount" },
      },
    },
  ])
    .then((result) => {
      if (result.length > 0) {
        const totalPurchase = result[0].totalPurchase;
        const totalDiscount = result[0].totalDiscount;
        return { totalDiscount, totalPurchase };
      } else {
        return { totalDiscount: 0, totalPurchase: 0 };
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

// const createDiscountCodeMiddleware = async () => {
//   try {
//     let discount = "";
//     const noOfOrder = await countOrdersMiddleware();
//     const isNthOrder = noOfOrder % 5;

//     if (!isNthOrder) {
//       const code = generateRandomCode(5);
//       const data = {
//         code,
//       };
//       if (data) {
//         const { error } = validateDiscount(data);
//         if (error) {
//           throw new Error(error.details[0].message);
//         }
//       }

//       const response = await createDiscount(data);

//       if (!response) {
//         throw new Error(`Discount Code could not be created .`);
//       }
//       discount = response.code;
//       return discount;
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const createDiscountCodeMiddleware = async (orderDetail, session) => {
  try {
    const code = generateRandomCode(5);
    const data = {
      code,
    };
    if (data) {
      const { error } = validateDiscount(data);
      if (error) {
        throw new Error(error.details[0].message);
      }
    }

    const response = await createDiscount(data);

    if (!response) {
      throw new Error(`Discount Code could not be created .`);
    }
    discount = response.code;
    return discount;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  orderCreation,
  countOrdersMiddleware,
  generateRandomCode,
  createDiscount,
  getDiscountMiddleware,
  updateDiscountMiddleware,
  getAllDiscountMiddleware,
  getTotalAmount,
  createDiscountCodeMiddleware,
  getAllPurchaseMiddleware,
};
