import PropTypes from "prop-types";
// @mui
import { TableRow, TableCell } from "@mui/material";
// components

// ----------------------------------------------------------------------

function PurchaseItem({ row }) {
  const { _id, amount, quantity } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{_id}</TableCell>
        <TableCell align="center">{amount}</TableCell>
        <TableCell align="center">{quantity}</TableCell>
      </TableRow>
    </>
  );
}

PurchaseItem.propTypes = {
  row: PropTypes.object,
};

export default PurchaseItem;
