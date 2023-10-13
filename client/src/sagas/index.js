import { all } from "redux-saga/effects";
import authSagas from "./auth";
import productSagas from "./products";
import discountSagas from "./discount";
import purchaseSagas from "./purchase";

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...productSagas,
    ...discountSagas,
    ...purchaseSagas,
  ]);
}
