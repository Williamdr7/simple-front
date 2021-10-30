import axios from "axios";
import Cookie from "js-cookie";

const AuthService = {
  accessToken,
  setToken,
  hasToken,
  setApiDefaults,
  setItem,
  getItem,
  logout,
};

export default AuthService;

function accessToken() {
  return "Bearer " + Cookie.get("accessToken");
}

function setToken(token) {
  Cookie.set("accessToken", token, { expires: 7 });
}

function hasToken() {
  return !!Cookie.get("accessToken");
}

function setApiDefaults() {
  axios.defaults.headers.common["Authorization"] = accessToken();
}

function setItem(itemName, data) {
  Cookie.set(itemName, btoa(data), { expires: 7 });
}

function getItem(itemName) {
  try {
    return JSON.parse(atob(Cookie.get(itemName)));
  } catch (error) {
    return;
  }
}

function logout() {
  const cookies = Cookie.get();
  Object.keys(cookies).forEach((key) => {
    Cookie.remove(key);
  });
}
