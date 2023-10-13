import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/LoginPage"))
);
export const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/RegisterPage"))
);

export const ProductList = Loadable(
  lazy(() => import("../pages/product/ProductList"))
);
export const ProductCreatePage = Loadable(
  lazy(() => import("../pages/product/ProductCreatePage"))
);
export const ProductDetails = Loadable(
  lazy(() => import("../pages/product/ProductDetails"))
);
export const Checkout = Loadable(
  lazy(() => import("../pages/checkout/Checkout"))
);

export const DiscountList = Loadable(
  lazy(() => import("../pages/discount/DiscountList"))
);
export const PurchaseList = Loadable(
  lazy(() => import("../pages/purchase/PurchaseList"))
);

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
