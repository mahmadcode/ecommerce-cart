import * as types from "../actions";

const INITIAL_STATE = {
  purchaseList: null,
  totalAmount: 0,
  totalDiscount: 0,
  message: null,
  error: null,
};

export default function purchase(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_PURCHASE_SUCCESS: {
      return {
        ...state,
        purchaseList: action.payload.items.purchaseList,
        totalAmount: action.payload.items.total.totalPurchase,
        totalDiscount: action.payload.items.total.totalDiscount,
        message: null,
        error: null,
      };
    }
    case types.PURCHASE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case types.CLEAR_PURCHASE_LIST: {
      return {
        ...state,
        purchaseList: null,
      };
    }

    case types.CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
