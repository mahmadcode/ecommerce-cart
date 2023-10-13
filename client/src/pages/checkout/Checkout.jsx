import { Helmet } from "react-helmet-async";
// sections
import CheckOutList from "../../sections/checkout/CheckOutList";

const Checkout = () => {
  return (
    <>
      <Helmet>
        <title> CheckOut </title>
      </Helmet>

      <CheckOutList />
    </>
  );
};

export default Checkout;

// ----------------------------------------------------------------------
