import { MenuItemProps } from "../constants/MenuItemProps";
import List from "@mui/material/List";
import { SidebarMenuItem } from "./SidebarMenuItem";

type SidebarMenuProps = {
  menuItems: MenuItemProps[];
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SidebarMenu = (props: SidebarMenuProps) => {
  const { menuItems, open, setOpen } = props;

  return (
    <List>
      {menuItems
        .filter((menuItem) => !menuItem.hideInMenu)
        .map((menuItem) => (
          <SidebarMenuItem
            key={menuItem.name}
            menuItem={menuItem}
            open={open}
            setOpen={setOpen}
          />
        ))}
    </List>
  );
};
