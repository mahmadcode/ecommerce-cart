import * as types from "./index";

// send the request to fetch all DISCOUNT
export const getDiscountRequest = () => ({
  type: types.GET_DISCOUNT_REQUEST,
});
// sending the data to redux store of all DISCOUNT
export const getDiscountSuccess = ({ items }) => ({
  type: types.GET_DISCOUNT_SUCCESS,
  payload: {
    items,
  },
});

export const discountError = ({ error }) => ({
  type: types.DISCOUNT_ERROR,
  payload: {
    error,
  },
});

export const clearDiscountList = () => ({
  type: types.CLEAR_DISCOUNT_LIST,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
