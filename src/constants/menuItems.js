import DashboardIcon from "@mui/icons-material/Dashboard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  {
    name: "Login",
    locale: "user.login",
    path: "/user/login",
    component: "pages/Login",
    hideInMenu: true,
    preLoginPage: true, // this key is used to create route without left side menu. this can be used for all prelogin pages
  },
  {
    path: "dashboard",
    locale: "dashboard",
    name: "Dashboard",
    icon: () => <DashboardIcon />,
    exact: true, // This route will only work for /dashboard . For /dashboard/analysis or other this component will not be rendered
    component: "pages/dashboard",
    routes: [
      {
        path: "dashboard/analysis",
        icon: () => <PsychologyIcon />,
        locale: "dashboard.analysis",
        name: "Analysis",
        component: "pages/dashboard/Analysis",
        exact: true,
        accessTO: ["admin"], // Allow only admins to view this menu and access this page
      },
      {
        path: "dashboard/monitor",
        icon: () => <MonitorHeartIcon />,
        locale: "dashboard.monitor",
        component: "pages/dashboard/Monitor",
        name: "Monitor",
        exact: true,
      },
      {
        path: "dashboard/workplace",
        icon: () => <ApartmentIcon />,
        locale: "dashboard.workplace",
        component: "pages/dashboard/WorkPlace",
        name: "Workplace",
        exact: true,
      },
    ],
  },
  {
    path: "projects",
    locale: "projects",
    name: "Projects",
    icon: () => <LaptopChromebookIcon />,
    redirect: "/projects/list", //Redirect /projects to /projects/list
    routes: [
      {
        path: "projects/list",
        locale: "projects.list",
        name: "Project List",
        icon: () => <FormatListBulletedIcon />,
        component: "pages/projects/ProjectList",
        exact: true,
      },
      {
        path: "projects/:id/settings",
        locale: "projects.settings",
        icon: () => <SettingsIcon />,
        name: "Settings",
        parentKey: "details",
        component: "pages/projects/ProjectSettings",
        exact: true,
      },
      {
        path: "projects/:id",
        locale: "projects.details",
        name: "Project Details",
        hideInMenu: true,
        icon: () => <DescriptionIcon />,
        key: "projects",
        component: "pages/projects/ProjectDetails",
        exact: true,
      },
    ],
  },
  {
    path: "*",
    component: "pages/NotFound",
    hideInMenu: true,
  },
];
