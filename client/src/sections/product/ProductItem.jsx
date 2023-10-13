import PropTypes from "prop-types";
// @mui
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components

import Iconify from "../../components/iconify";

export default function ProductItem({ product }) {
  const { _id, title, description } = product;

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      secondary={
        <Link
          variant="subtitle2"
          underline="hover"
          href={PATH_DASHBOARD.products.details(_id)}
          color="inherit"
        >
          {title}
        </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "text.disabled",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        // typography: "subtitle1",
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        // sx={{ typography: "body2" }}
      >
        <Stack>
          <Iconify
            icon="fluent:text-description-rtl-20-regular"
            sx={{ color: "info.main" }}
          />
        </Stack>
        <Typography
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Set the number of lines you want to display
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Card>
        {renderTexts}

        {renderInfo}
      </Card>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object,
};
