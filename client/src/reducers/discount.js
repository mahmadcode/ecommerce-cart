import * as types from "../actions";

const INITIAL_STATE = {
  discountList: null,
  message: null,
  error: null,
};

export default function discount(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_DISCOUNT_SUCCESS: {
      return {
        ...state,
        discountList: action.payload.items,
        message: null,
        error: null,
      };
    }
    case types.DISCOUNT_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case types.CLEAR_DISCOUNT_LIST: {
      return {
        ...state,
        discountList: null,
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
