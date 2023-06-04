import { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MenuItemProps } from "../constants/MenuItemProps";
import { Collapse } from "@mui/material";
import { SidebarMenu } from "./SidebarMenu";
import useStyles from "./SidebarStyles";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type SidebarMenuItemProps = {
  menuItem: MenuItemProps;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const { menuItem, open, setOpen } = props;
  const [isOpen, setIsOpen] = useState(false); // this state is used for collapsing submenu items
  const { classes } = useStyles();
  let location = useLocation();
  const { t } = useTranslation();

  const toggleCollapse = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!open) {
      setOpen(true);
      if (!isOpen) {
        setIsOpen(!isOpen);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    // collapse all submenus if drawer is closed
    if (!open) {
      setIsOpen(false);
    }
  }, [open]);

  // if path contains parameters like :id, then we will replace it by [a-z,A-Z,0-9] so any dynamic id will be matched
  var isLinkActive =
    menuItem.path && menuItem.path.includes(":")
      ? new RegExp(
          menuItem.path
            .split("/")
            .map((pathElement) =>
              pathElement.includes(":") ? "[a-z,A-Z,0-9]" : pathElement
            )
            .join("/")
        ).test(location.pathname)
      : location.pathname === `/${menuItem.path}`;

  return (
    <>
      <ListItem
        key={menuItem.name}
        component={Link}
        to={menuItem.path.replace(":id", "0")}
        disablePadding
        sx={{ display: "block" }}
        classes={{
          root: classnames({
            [classes.linkActive]: isLinkActive,
          }),
        }}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
          menuItem.routes ? toggleCollapse(e) : {}
        }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: isLinkActive ? "#fff" : undefined,
            }}
          >
            {menuItem.icon && menuItem.icon()}
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classnames(classes.linkText, {
                [classes.linkTextActive]: isLinkActive,
              }),
            }}
            primary={t(menuItem.locale)}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
      {menuItem.routes && (
        <Collapse
          in={isOpen}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <SidebarMenu
            menuItems={menuItem.routes}
            open={open}
            setOpen={setOpen}
          />
        </Collapse>
      )}
    </>
  );
};
