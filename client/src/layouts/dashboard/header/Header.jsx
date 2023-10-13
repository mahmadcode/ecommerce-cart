import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, Link } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components

import AccountPopover from "./AccountPopover";
import { navAdminConfig, navConfig } from "./config-navigation";
// ----------------------------------------------------------------------

const Header = ({ Auth: { user } }) => {
  const theme = useTheme();
  const renderContent = (
    <>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: 64,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Stack direction="row" spacing={5}>
          {user.is_admin
            ? navAdminConfig.map((item) => (
                <Link
                  component={RouterLink}
                  key={item.title}
                  to={item.path}
                  underline="none"
                >
                  {item.title}
                </Link>
              ))
            : navConfig.map((item) => (
                <Link
                  component={RouterLink}
                  key={item.title}
                  to={item.path}
                  underline="none"
                >
                  {item.title}
                </Link>
              ))}
        </Stack>

        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

Header.propTypes = {
  Auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, {})(Header);
