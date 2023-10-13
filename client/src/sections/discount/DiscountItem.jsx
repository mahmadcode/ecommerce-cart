import PropTypes from "prop-types";
// @mui
import { TableRow, TableCell } from "@mui/material";
// components

import Iconify from "../../components/iconify";
// ----------------------------------------------------------------------

function DiscountItem({ row }) {
  const {
    // _id,
    is_valid,
    code,
  } = row;

  return (
    <>
      <TableRow hover>
        <TableCell align="center">{code}</TableCell>

        <TableCell align="center">
          <Iconify
            icon={is_valid ? "eva:checkmark-circle-fill" : "charm:cross"}
            sx={{
              width: 20,
              height: 20,
              color: "success.main",
              ...(!is_valid && { color: "warning.main" }),
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

DiscountItem.propTypes = {
  row: PropTypes.object,
};

export default DiscountItem;
