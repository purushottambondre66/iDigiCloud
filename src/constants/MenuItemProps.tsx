export interface MenuItemProps {
  name: string;
  locale: string;
  path: string;
  component: string;
  icon?: () => React.ReactElement;
  hideInMenu?: boolean;
  exact?: boolean;
  accessTO?: string[];
  redirect?: string;
  routes?: MenuItemProps[];
  key?: string;
  parentKey?: string;
  preLoginPage?: boolean;
}
