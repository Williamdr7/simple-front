import React, { useState } from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
import "./sidebar_overrides.scss";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
} from "react-pro-sidebar";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import PersonIcon from "@material-ui/icons/Person";
import Link from "redux-first-router-link";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthService from "../../services/auth.service";

export default function SideBar() {
  const [closed, setClosed] = useState(false);
  const user = AuthService.getItem("user") || {
    email: "williamduarte499@gmail.com",
  };

  const logout = () => {
    AuthService.logout();
    window.location.pathname = "/login";
  };

  return (
    <div className="menuBox">
      <ProSidebar
        className={closed ? "proSideBarBoxClosed" : "proSideBarBox"}
        collapsed={closed}
      >
        <div className="menuFixedDesktop">
          <Link to="/">
            <div className="logoContainer">
              <img
                src="http://www.rocketbank.com.br/assets/img/logo/logo-rocket.webp"
                alt="logo"
              />
              {/*<img
                className="selectSource"
                src={Unidade}
                alt="Unidade de negócio"
              />*/}
            </div>
          </Link>
          <div className="optionsMenu">
            <div className="rightOptions">
              <PersonIcon />
              {user && user.email}
            </div>
          </div>
        </div>
        <ArrowContainer closed={closed} setClosed={setClosed} />
        <SidebarHeader className="sideMenuHeader"></SidebarHeader>
        <SidebarContent className="w-100">
          <Menu className="menuContainer">
            {TABS.map((tab) => {
              const isSelectedTab =
                tab.to === "/users" && window.location.pathname === "/"
                  ? true
                  : window.location.pathname.includes(
                      tab.to.substring(0, tab.to.length)
                    );
              return (
                <MenuItem
                  key={tab.label}
                  className={`menuItem ${isSelectedTab && "selected"} ${
                    closed && "closed"
                  }`}
                  icon={tab.icon}
                >
                  <Link
                    className={isSelectedTab ? "selectedTabLink" : "tabLink"}
                    to={tab.to}
                  >
                    {tab.label}
                  </Link>
                </MenuItem>
              );
            })}
            <MenuItem
              key="logout"
              className={`menuItem`}
              icon={<ExitToAppIcon />}
              onClick={logout}
            >
              <Link className="tabLink" to="">
                Sair
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}

const ArrowContainer = ({ setClosed, closed }) => {
  return (
    <div className="arrowBox">
      {closed ? (
        <ArrowRightIcon
          color="#555"
          onClick={() => setClosed(false)}
          className="arrowIcon"
        />
      ) : (
        <ArrowLeftIcon
          onClick={() => setClosed(true)}
          color="#555"
          className="arrowIcon"
        />
      )}
    </div>
  );
};

const TABS = [
  {
    icon: <ListAltIcon />,
    label: "Usuários",
    to: "/users",
  },
  {
    icon: <PersonIcon />,
    label: "Meus Dados",
    to: "/account",
  },
];
