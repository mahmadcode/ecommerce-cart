import axios from "../utils/axios";

export const getProduct = () => axios.get("/product");

export const getCart = () => axios.get("/product/cart");

export const createProduct = (data) => axios.post("/product", data);

export const addToCart = (data) => axios.post("/product/addtocart", data);

export const checkOut = (data) => axios.post("/order", data);

export const getProductById = ({ productId }) =>
  axios.get(`/product/${productId}`);
