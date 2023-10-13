import { PATH_DASHBOARD } from "../../../routes/paths";

export const navAdminConfig = [
  {
    title: "Discount",
    path: PATH_DASHBOARD.discountlist,

    // icon: ICONS.dashboard,
  },
  {
    title: "Purchase",
    path: PATH_DASHBOARD.purchaselist,
  },
  {
    title: "CreateProducts",
    path: PATH_DASHBOARD.products.create,
  },
];
export const navConfig = [
  {
    title: "CheckOut",
    path: PATH_DASHBOARD.checkout,
  },
];
