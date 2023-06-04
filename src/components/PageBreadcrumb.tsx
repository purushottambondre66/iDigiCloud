import { Breadcrumbs, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../context/LayoutContext";
import useStyles from "./SidebarStyles";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MenuItemProps } from "../constants/MenuItemProps";
import { useTranslation } from "react-i18next";

export const PageBreadcrumb = () => {
  const { classes } = useStyles();
  const { menuItems } = useContext(LayoutContext);
  let location = useLocation();
  let urlParams = useParams();
  const [breadcrumb, setBreadcrumb] = useState<MenuItemProps[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const checkMenuMatch = (menuItem: MenuItemProps) => {
    if (menuItem) {
      return (
        menuItem.path &&
        (menuItem.path.includes(":")
          ? new RegExp(
              menuItem.path
                .split("/")
                .map((pathElement) =>
                  pathElement.includes(":") ? "[a-z,A-Z,0-9]" : pathElement
                )
                .join("/")
            ).test(location.pathname)
          : location.pathname === `/${menuItem.path}`)
      );
    } else {
      return false;
    }
  };

  const createBreadcrumb = (menuItem: MenuItemProps) => {
    let breadcrumbItems: MenuItemProps[] = [];
    breadcrumbItems.unshift(menuItem);
    menuItem.path
      .split("/")
      .reverse()
      .forEach((item, index, arr) => {
        //skip first element as we have already added in breadcrumbItems
        if (item && index > 0) {
          if (item.includes(":")) {
            //insert dynamic id from url to breadcrumb
            let parameter = urlParams[item.replace(":", "")];
            breadcrumbItems.unshift({
              name: parameter || "",
              locale:parameter || "",
              path: `${arr[index + 1]}/${parameter || ""}`,
              component: "",
            });
          } else {
            let parentElement = menuItems.find((parentItem: MenuItemProps) => {
              return parentItem.path === item;
            });
            breadcrumbItems.unshift(parentElement);
          }
        }
      });
    setBreadcrumb(breadcrumbItems);
  };

  useEffect(() => {
    for (let i = 0; i < menuItems.length; i++) {
      let menuItem = menuItems[i];
      let matched = checkMenuMatch(menuItem);
      if (!matched) {
        //if parent not matched, then check for child menus
        if (menuItem.routes) {
          for (let j = 0; j < menuItems.length; j++) {
            let subMenu = menuItem.routes[j];
            let subMenuMatched = checkMenuMatch(subMenu);
            if (subMenuMatched) {
              // break loop if item found
              createBreadcrumb(subMenu);
              break;
            }
          }
        }
      } else {
        createBreadcrumb(menuItem);
        // break loop if item found
        break;
      }
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Paper className={classes.breadcrumbContainer}>
      <Breadcrumbs>
        {breadcrumb.map((item, index) =>
          index === breadcrumb.length - 1 ? (
            <Typography
              key={item.name}
              color="text.secondary"
              className={classes.breadcrumbInactiveLink}
            >
              {item.icon && item.icon()}
              {t(item.locale)}
            </Typography>
          ) : (
            <Typography
              key={item.name}
              color="primary"
              onClick={() => navigate(item.path)}
              className={classes.breadcrubmLink}
            >
              {item.icon && item.icon()}
              {t(item.locale)}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Paper>
  );
};
