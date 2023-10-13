import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// @mui
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import Scrollbar from "../../components/scrollbar";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from "../../components/table";
// sections
import PurchaseItem from "../../sections/purchase/Purchaseitem";

// Action
import { getPurchaseRequest, clearPurchaseList } from "../../actions/purchase";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";

const TABLE_HEAD = [
  { id: "_id", label: "ID", align: "center" },
  { id: "amount", label: "Amount", align: "center" },
  { id: "quantity", label: "Quantity", align: "center" },
];

// ----------------------------------------------------------------------

function PurchaseList({
  Purchase: { purchaseList, totalAmount, totalDiscount, error },
  Auth: { isAuthenticated },
  getPurchase,
  clrPurchaseList,
}) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }

    if (purchaseList == null) {
      getPurchase();
    } else {
      setTableData(purchaseList);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, purchaseList, error]);

  useEffect(
    () => () => clrPurchaseList(),
    // eslint-disable-next-line
    []
  );

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    selected,

    onSort,

    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const navigate = useNavigate();

  const denseHeight = 52;

  const isNotFound = !tableData?.length;

  return (
    <>
      <Helmet>
        <title> Purchase</title>
      </Helmet>

      <Container maxWidth="md">
        <CustomBreadcrumbs
          heading="Purchase List"
          links={[
            { name: "Product", href: PATH_DASHBOARD.products.root },
            { name: "Purchase" },
          ]}
        />
        <Stack
          direction="row"
          sx={{
            px: 4,
            mb: 3,
          }}
          justifyContent="space-between"
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Purchase Amount
              </Typography>
              <Typography variant="h4" component="div">
                Rs {totalAmount}
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Discount Amount
              </Typography>
              <Typography variant="h4" component="div">
                Rs {totalDiscount}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
        <Card>
          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <PurchaseItem key={row._id} row={row} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData?.length}
            page={page}
            rowsPerPageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
          />
        </Card>
      </Container>
    </>
  );
}

PurchaseList.propTypes = {
  Purchase: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getPurchase: PropTypes.func.isRequired,
  clrPurchaseList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Purchase: state.Purchase,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getPurchase: getPurchaseRequest,
  clrPurchaseList: clearPurchaseList,
})(PurchaseList);
// ----------------------------------------------------------------------
