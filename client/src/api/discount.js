import axios from "../utils/axios";

export const getDiscount = () => axios.get("/order/discountList");
