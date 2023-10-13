import { combineReducers } from "redux";
import AuthReducer from "./auth";
import ProductReducer from "./products";
import DiscountReducer from "./discount";
import PurchaseReducer from "./purchase";

export default combineReducers({
  Auth: AuthReducer,
  Discount: DiscountReducer,
  Product: ProductReducer,
  Purchase: PurchaseReducer,
});
