import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
// routes
import { PATH_DASHBOARD, PATH_AUTH } from "../../routes/paths";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmptyContent from "../../components/empty-content";

import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
//
import CheckOutItem from "./CheckOutItem";
import {
  getCartRequest,
  clearCartList,
  clearError,
  checkOutRequest,
} from "../../actions/products";
import { Divider, TextField, Typography } from "@mui/material";

// ----------------------------------------------------------------------

function CheckOutList({
  Product: { error, cartList, coupon },
  Auth: { isAuthenticated },
  getCart,
  clrCartList,
  checkOut,
  clrError,
}) {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [cartIds, setCartIds] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const navigate = useNavigate();

  const errToast = (err) => toast.error(err, { autoClose: 5000 });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }

    if (cartList === null) {
      getCart();
    } else {
      setTableData(cartList);
      setTotal(0);
      setCartIds([]);
      setTotalQuantity(0);

      cartList.map((cart) => {
        setCartIds((prev) => [...prev, cart._id]);
        setTotalQuantity((prev) => prev + cart.quantity);
        let price = cart.quantity * cart.product_id.amount;
        setTotal((prev) => prev + price);
        return "";
      });
    }

    // eslint-disable-next-line
  }, [isAuthenticated, cartList]);

  useEffect(() => {
    if (error) {
      errToast(error);
    }

    // eslint-disable-next-line
  }, [error]);

  useEffect(
    () => () => {
      clrCartList();
      clrError();
    },
    // eslint-disable-next-line
    []
  );

  const handleDiscount = () => {
    if (code) {
      const dis = total * 0.1;
      setDiscount(dis);
      setPriceAfterDiscount(total - dis);
    }
  };

  const handleCheckOut = () => {
    checkOut({
      cartIds,
      amount: total,
      code,
      quantity: totalQuantity,
    });
  };

  const isNotFound = !tableData.length;

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="CheckOut"
        links={[
          { name: "Product", href: PATH_DASHBOARD.products.root },
          { name: "CheckOut" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ToastContainer />
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      ></Stack>
      {isNotFound && <EmptyContent title="No Data" sx={{ py: 10 }} />}
      {!!tableData.length && (
        <>
          {tableData.map((product) => (
            <CheckOutItem key={product._id} product={product} />
          ))}

          <Divider />
          <Typography variant="subtitle1">
            Coupon Code:&nbsp;
            {coupon}
          </Typography>

          <Typography variant="subtitle1">
            Total:&nbsp;
            {total}
          </Typography>
          <TextField
            name="code"
            label="Code"
            onChange={(e) => setCode(e.target.value)}
            size="small"
            sx={{ mr: 2 }}
          />
          <Button onClick={handleDiscount} color="success" variant="contained">
            {" "}
            Apply Code{" "}
          </Button>
          <Typography variant="subtitle1">
            Discount 10%:{discount} &nbsp;
          </Typography>
          <Typography variant="subtitle1">
            Price After Discount:{priceAfterDiscount} &nbsp;
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Button onClick={handleCheckOut} color="info" variant="contained">
            CheckOut
          </Button>
        </>
      )}
    </Container>
  );
}

CheckOutList.propTypes = {
  Product: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
  checkOut: PropTypes.func.isRequired,
  clrError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Product: state.Product,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getCart: getCartRequest,
  clrCartList: clearCartList,
  checkOut: checkOutRequest,
  clrError: clearError,
})(CheckOutList);
