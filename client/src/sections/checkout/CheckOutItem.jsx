import PropTypes from "prop-types";

import { connect } from "react-redux";
// @mui
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

function CheckOutItem({ product }) {
  const { quantity, product_id } = product;
  const { title, description, amount } = product_id || null;

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(quantity * amount);
    // eslint-disable-next-line
  }, []);

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity: &nbsp; {parseInt(quantity, 10)}
      </Typography>

      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        Rs {totalAmount}
      </Typography>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {description}
    </Typography>
  );

  return (
    <Stack spacing={3} sx={{ pt: 3 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h5">{title}</Typography>

        {renderSubDescription}
      </Stack>

      {renderQuantity}

      <Divider sx={{ borderStyle: "dashed" }} />
    </Stack>
  );
}

CheckOutItem.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
};

export default connect(null, {})(CheckOutItem);
