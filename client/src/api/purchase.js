import axios from "../utils/axios";

export const getPurchase = () => axios.get("/order/purchase");
