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
import DiscountItem from "../../sections/discount/DiscountItem";

// Action
import { getDiscountRequest, clearDiscountList } from "../../actions/discount";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";

const TABLE_HEAD = [
  { id: "code", label: "Code", align: "center" },
  { id: "is_valid", label: "Valid", align: "center" },
];

// ----------------------------------------------------------------------

function DiscountList({
  Discount: { discountList, error },
  Auth: { isAuthenticated, user },
  getDiscount,
  clrDiscountList,
}) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }

    if (discountList == null) {
      getDiscount();
    } else {
      setTableData(discountList);
    }

    // eslint-disable-next-line
  }, [isAuthenticated, discountList, error]);

  useEffect(
    () => () => clrDiscountList(),
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
        <title> Discount</title>
      </Helmet>

      <Container maxWidth="md">
        <CustomBreadcrumbs
          heading="Discount List"
          links={[
            { name: "Product", href: PATH_DASHBOARD.products.root },
            { name: "Discount" },
          ]}
        />

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
                      <DiscountItem key={row._id} row={row} />
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

DiscountList.propTypes = {
  Discount: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  getDiscount: PropTypes.func.isRequired,
  clrDiscountList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Discount: state.Discount,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  getDiscount: getDiscountRequest,
  clrDiscountList: clearDiscountList,
})(DiscountList);
// ----------------------------------------------------------------------
