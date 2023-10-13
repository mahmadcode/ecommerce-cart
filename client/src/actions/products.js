import * as types from "./index";

// send the request to fetch all product
export const getProductRequest = () => ({
  type: types.GET_PRODUCT_REQUEST,
});
// sending the data to redux store of all product
export const getProductSuccess = ({ items }) => ({
  type: types.GET_PRODUCT_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch all Cart
export const getCartRequest = () => ({
  type: types.GET_CART_REQUEST,
});
// sending the data to redux store of all product
export const getCartSuccess = ({ items }) => ({
  type: types.GET_CART_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch product by id
export const getProductByIdRequest = (productId) => ({
  type: types.GET_PRODUCT_BY_ID_REQUEST,
  payload: {
    productId,
  },
});

// sending the data to redux store of the product
export const getProductByIdSuccess = ({ productDetails }) => ({
  type: types.GET_PRODUCT_BY_ID_SUCCESS,
  payload: {
    productDetails,
  },
});

export const createProductRequest = (data) => ({
  type: types.CREATE_PRODUCT_REQUEST,
  payload: {
    ...data,
  },
});

export const createProductSuccess = ({ message }) => ({
  type: types.CREATE_PRODUCT_SUCCESS,
  payload: {
    message,
  },
});
export const checkOutRequest = (data) => ({
  type: types.CHECK_OUT_REQUEST,
  payload: {
    ...data,
  },
});

export const checkOutSuccess = ({ message }) => ({
  type: types.CHECK_OUT_SUCCESS,
  payload: {
    message,
  },
});

export const addToCartRequest = (data) => ({
  type: types.ADD_TO_CART_REQUEST,
  payload: {
    ...data,
  },
});

export const addToCartSuccess = ({ message }) => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload: {
    message,
  },
});

export const productError = ({ error }) => ({
  type: types.PRODUCT_ERROR,
  payload: {
    error,
  },
});

export const clearProductList = () => ({
  type: types.CLEAR_PRODUCT_LIST,
});

export const clearCartList = () => ({
  type: types.CLEAR_CART_LIST,
});

export const clearProduct = () => ({
  type: types.CLEAR_PRODUCT,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
