import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/discount";
import * as authActions from "../actions/auth";
import * as api from "../api/discount";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getDiscount() {
  try {
    const result = yield call(api.getDiscount);

    yield put(
      actions.getDiscountSuccess({
        items: result.data.discountList,
      })
    );
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.discountError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetDiscountRequest() {
  yield takeEvery(types.GET_DISCOUNT_REQUEST, getDiscount);
}

const discountSagas = [fork(watchGetDiscountRequest)];

export default discountSagas;
