import { lazy } from "react";

export const getComponent = (component: string | undefined) => {
  if (component) {
    const Component = lazy(() => import(`../${component}`));
    return Component;
  } else {
    const NotFoundComponent = lazy(() => import("../pages/NotFound"));
    return NotFoundComponent;
  }
};
