import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { LayoutContext } from "../context/LayoutContext";
import { SidebarMenu } from "./SidebarMenu";
import { Paper, Button } from "@mui/material";
import useStyles from "./SidebarStyles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { PageBreadcrumb } from "./PageBreadcrumb";
import { Outlet } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { menuItems, setIsLoggedIn, language, setLanguage } =
    React.useContext(LayoutContext);
  const { classes } = useStyles();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 1000);
  };

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    console.log("event.target.value", event.target.value);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            iDigiCloud
          </Typography>
          <div className={classes.languageContainer}>
            <Select
              id="languageSelection"
              value={language}
              label="Language"
              onChange={handleChangeLanguage}
              className={classes.languageSelect}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"hi"}>Hindi</MenuItem>
            </Select>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SidebarMenu menuItems={menuItems} open={open} setOpen={setOpen} />
        {open && (
          <Paper className={classes.userInfoCard}>
            <Typography>{t("welcome-text")}</Typography>
            <Button
              variant="contained"
              className={classes.logoutButton}
              onClick={handleLogout}
            >
              <PowerSettingsNewIcon className={classes.buttonIcon} />
              {t("logout")}
            </Button>
          </Paper>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <PageBreadcrumb />
        <Outlet />
      </Box>
    </Box>
  );
};
