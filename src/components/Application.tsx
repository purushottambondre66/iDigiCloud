import React, { useContext, useEffect, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutContext } from "../context/LayoutContext";
import { getComponent } from "../utils/AppUtils";
import { CircularProgress } from "@mui/material";
import { MenuItemProps } from "../constants/MenuItemProps";
import { Layout } from "../components/Layout";
import i18n from "i18next";
import useStyles from "./SidebarStyles";

type RouteTypes = {
  path: string;
  name: string;
  component: string | undefined;
  redirect: string | undefined;
};

export const Application = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [preLoginRoutes, setPreLoginRoutes] = useState<RouteTypes[]>([]);
  const [postLoginRoutes, setPostLoginRoutes] = useState<RouteTypes[]>([]);
  const { menuItems, isLoggedIn, setIsLoggedIn } = useContext(LayoutContext);
  const { classes } = useStyles();

  useEffect(() => {
    let preLoginRouteList: RouteTypes[] = [];
    let postLoginRouteList: RouteTypes[] = [];
    menuItems.forEach((menu: MenuItemProps) => {
      if (menu.preLoginPage) {
        preLoginRouteList.push({
          path: menu.path,
          name: menu.name || "",
          component: menu.component,
          redirect: menu.redirect,
        });
      } else {
        postLoginRouteList.push({
          path: menu.path,
          name: menu.name || "",
          component: menu.component,
          redirect: menu.redirect,
        });
        if (menu.routes) {
          menu.routes.forEach((subMenu) => {
            postLoginRouteList.push({
              path: subMenu.path,
              name: subMenu.name,
              component: subMenu.component,
              redirect: "",
            });
          });
        }
      }
    });
    setPreLoginRoutes(preLoginRouteList);
    setPostLoginRoutes(postLoginRouteList);
    // check login status
    let loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setTimeout(() => {
      // fetch user data here instead of timeout when user is already logged in
      setAppLoading(false);
    }, 2000);

    //initialize i18next
    i18n.init(
      {
        fallbackLng: "en",
        lng: "en",
        nsSeparator: ":",
        debug: true,
        interpolation: {
          escapeValue: false,
        },
      },
      function (err, t) {
        // initialized and ready to go!
        console.log("Ready to go!");
      }
    );

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {appLoading ? (
        <CircularProgress className={classes.apploader} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <Navigate to={"/user/login"} />
              )
            }
          />
          {preLoginRoutes.map(({ path, name, component, redirect }) => {
            const Component = getComponent(component);
            return (
              <Route
                key={name}
                path={path}
                element={
                  isLoggedIn ? (
                    <Navigate to={"/dashboard"} />
                  ) : redirect ? (
                    <Navigate to={redirect} />
                  ) : (
                    <Suspense fallback={<CircularProgress />}>
                      <Component />
                    </Suspense>
                  )
                }
              />
            );
          })}

          <Route
            path="/"
            element={isLoggedIn ? <Layout /> : <Navigate to={"/user/login"} />}
          >
            {postLoginRoutes.map(({ path, name, component, redirect }) => {
              const Component = getComponent(component);
              return (
                <Route
                  key={name}
                  path={path}
                  element={
                    redirect ? (
                      <Navigate to={redirect} />
                    ) : (
                      <React.Suspense fallback={<CircularProgress />}>
                        <Component />
                      </React.Suspense>
                    )
                  }
                />
              );
            })}
          </Route>
        </Routes>
      )}
    </>
  );
};
