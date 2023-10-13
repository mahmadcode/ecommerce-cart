import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/products";
import * as authActions from "../actions/auth";
import * as api from "../api/product";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getProduct() {
  try {
    const result = yield call(api.getProduct);

    yield put(
      actions.getProductSuccess({
        items: result.data.products,
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetProductRequest() {
  yield takeEvery(types.GET_PRODUCT_REQUEST, getProduct);
}

function* getCart() {
  try {
    const result = yield call(api.getCart);

    yield put(
      actions.getCartSuccess({
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetCartRequest() {
  yield takeEvery(types.GET_CART_REQUEST, getCart);
}

function* createProduct({ payload }) {
  try {
    const response = yield call(api.createProduct, {
      title: payload.title,
      description: payload.description,
      quantity: parseInt(payload.quantity, 10),
      amount: parseInt(payload.amount, 10),
    });

    yield put(
      actions.createProductSuccess({
        message: response.data.message,
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
      console.log(e);
      yield put(
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCreateProductRequest() {
  yield takeEvery(types.CREATE_PRODUCT_REQUEST, createProduct);
}

function* addToCart({ payload }) {
  try {
    const response = yield call(api.addToCart, payload);

    yield put(
      actions.addToCartSuccess({
        message: response.data.message,
      })
    );

    yield put(actions.getProductByIdRequest(payload.product_id));
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchAddToCartRequest() {
  yield takeEvery(types.ADD_TO_CART_REQUEST, addToCart);
}

function* getProductById({ payload }) {
  try {
    const result = yield call(api.getProductById, payload);

    yield put(
      actions.getProductByIdSuccess({
        productDetails: result.data.products,
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
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetProductByIdRequest() {
  yield takeEvery(types.GET_PRODUCT_BY_ID_REQUEST, getProductById);
}

function* checkOut({ payload }) {
  try {
    const response = yield call(api.checkOut, payload);

    yield put(
      actions.checkOutSuccess({
        message: response.data.message,
      })
    );
    yield put(actions.getCartRequest());
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
      console.log(e);
      yield put(
        actions.productError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCheckOutRequest() {
  yield takeEvery(types.CHECK_OUT_REQUEST, checkOut);
}

const productSagas = [
  fork(watchGetProductRequest),
  fork(watchCreateProductRequest),
  fork(watchGetProductByIdRequest),
  fork(watchAddToCartRequest),
  fork(watchGetCartRequest),
  fork(watchCheckOutRequest),
];

export default productSagas;
