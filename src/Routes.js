import React from "react";
import { useSelector } from "react-redux";
import { connectRoutes, NOT_FOUND } from "redux-first-router";
import * as Pages from "./business/pages";
import Cookies from "js-cookie";
import SideBar from "./components/SideBar/SideBar";
import { types as routes } from "./reducers/routes.actions";

const privateRoutePages = {
  [routes.DEFAULT]: Pages.HomePage,
  [routes.HOME]: Pages.HomePage,
  [routes.USER]: Pages.UserPage,
  [routes.ACCOUNT]: Pages.AccountPage,
  [NOT_FOUND]: Pages.HomePage,
};
const publicRoutePages = {
  [routes.SIGNIN]: Pages.SigninPage,
  [NOT_FOUND]: Pages.SigninPage,
};

const routePaths = {
  [routes.DEFAULT]: "/",
  [routes.HOME]: "/users",
  [routes.ACCOUNT]: "/account",
  [routes.SIGNIN]: "/login",
  [routes.USER]: "/user/:id",
};

const { reducer, middleware, enhancer } = connectRoutes(routePaths, {
  basename: process.env.REACT_APP_BASE_CONTEXT,
});

export { reducer, middleware, enhancer };

const isLogged = Cookies.get("user");

if (!isLogged && !window.location.pathname.includes("login"))
  window.location.pathname = "/login";

const Container = () => {
  const routeCode = useSelector((state) => state.location.type);
  const PrivateRoutes =
    privateRoutePages[routeCode] ?? privateRoutePages[NOT_FOUND];
  const PublicRoutes =
    publicRoutePages[routeCode] ?? publicRoutePages[NOT_FOUND];

  if (isLogged)
    return (
      <div className="mainContainer">
        <SideBar />
        <div className="contentContainer">
          <PrivateRoutes />
        </div>
      </div>
    );
  return (
    <div className="mainContainer">
      <PublicRoutes />
    </div>
  );
};

export default Container;
