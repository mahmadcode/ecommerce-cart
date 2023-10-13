import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
// @mui
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Iconify from "../../components/iconify";

import FormProvider from "../../components/hook-form";
//
import IncrementerButton from "./common/incrementer-button";

import { addToCartRequest } from "../../actions/products";

// ----------------------------------------------------------------------

function ProductDetailsSummary({ product, addToCart, user }) {
  const { _id, title, description, quantity, amount } = product;

  const defaultValues = {
    colorsPicker: 0,
    tonePicker: 0,
    selectedImage: 0,
    available: quantity < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, getValues } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleAddCart = handleSubmit(async (data) => {
    const cartData = {
      product_id: _id,
      quantity: data.available,
      user_id: user._id,
    };

    addToCart(cartData);
  });

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="available"
          quantity={values.available}
          disabledDecrease={values.available <= 1}
          disabledIncrease={values.available >= quantity}
          onIncrease={() => setValue("available", values.available + 1)}
          onDecrease={() => setValue("available", values.available - 1)}
        />

        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: "right" }}
        >
          Available: {parseInt(quantity, 10)}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        size="large"
        type="submit"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        sx={{ whiteSpace: "nowrap" }}
      >
        Add to Cart
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {description}
    </Typography>
  );

  const renderPrice = (
    <Typography variant="h6" sx={{ color: "text.secondary" }}>
      Rs {amount}
    </Typography>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleAddCart}>
      <Stack spacing={3} sx={{ pt: 3 }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h5">{title}</Typography>

          {renderSubDescription}
        </Stack>
        {renderPrice}
        <Divider sx={{ borderStyle: "dashed" }} />
        {renderQuantity}
        <Divider sx={{ borderStyle: "dashed" }} />
        {renderActions}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
  addToCart: PropTypes.func,
};

export default connect(null, {
  addToCart: addToCartRequest,
})(ProductDetailsSummary);
