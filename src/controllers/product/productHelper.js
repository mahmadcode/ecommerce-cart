const { Products } = require("../../models/products");
const { AddToCart } = require("../../models/addToCart");

const updateProductMiddleware = (id, newQuantity, session) => {
  return Products.findByIdAndUpdate(id, newQuantity)
    .session(session)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const addToCartMiddleware = async (cartDetail, session) => {
  try {
    const result = await AddToCart.create([cartDetail], { session: session });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllProductsMiddleware = () => {
  return Products.find({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
const getAllCartsMiddleware = (userId) => {
  return AddToCart.find({ user_id: userId, is_check_out: false })
    .populate({
      path: "product_id",
      select: "is_check_out title description amount",
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
const getOrderQuantity = (userId) => {
  return AddToCart.aggregate([
    {
      $match: {
        user_id: userId,
        is_check_out: false,
      },
    },
    {
      $group: {
        _id: null,
        quantity: { $sum: "$quantity" },
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

const getProductMiddleware = (id) => {
  return Products.findById(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
const getProductById = (id) => {
  return Products.findById(id)
    .select("title description quantity")
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

async function productCreation(productDetail) {
  try {
    const result = new Products(productDetail);
    const product = await result.save();
    return product;
  } catch (error) {
    throw new Error(error);
  }
}
// for check out only
async function cartUpdate(cartIdsToUpdate, updateData, session) {
  // const cartId = cartIdsToUpdate.map((id) => mongoose.Types.ObjectId(id));

  return AddToCart.updateMany(
    { _id: { $in: cartIdsToUpdate } }, // Find carts with IDs in the provided array
    // updateData,
    { $set: updateData },
    { session: session }
  )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

//
module.exports = {
  cartUpdate,
  productCreation,
  getAllProductsMiddleware,
  getProductMiddleware,
  getProductById,
  updateProductMiddleware,
  addToCartMiddleware,
  getAllCartsMiddleware,
  getOrderQuantity,
};
