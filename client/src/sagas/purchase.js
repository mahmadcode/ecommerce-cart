import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/purchase";
import * as authActions from "../actions/auth";
import * as api from "../api/purchase";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getPurchase() {
  try {
    const result = yield call(api.getPurchase);

    yield put(
      actions.getPurchaseSuccess({
        items: result.data,
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
        actions.purchaseError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetPurchaseRequest() {
  yield takeEvery(types.GET_PURCHASE_REQUEST, getPurchase);
}

const purchaseSagas = [fork(watchGetPurchaseRequest)];

export default purchaseSagas;
