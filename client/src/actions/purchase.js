import * as types from "./index";

// send the request to fetch all PURHCHASE
export const getPurchaseRequest = () => ({
  type: types.GET_PURCHASE_REQUEST,
});
// sending the data to redux store of all PURHCHASE
export const getPurchaseSuccess = ({ items }) => ({
  type: types.GET_PURCHASE_SUCCESS,
  payload: {
    items,
  },
});

export const purchaseError = ({ error }) => ({
  type: types.PURCHASE_ERROR,
  payload: {
    error,
  },
});

export const clearPurchaseList = () => ({
  type: types.CLEAR_PURCHASE_LIST,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});
