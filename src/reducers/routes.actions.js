import { createSyncAction } from "../utils/actionCreators";

export const types = {
  DEFAULT: "@@routes/",
  HOME: "@@routes/home",
  USER: "@@routes/user",
  ACCOUNT: "@@routes/account",
  SIGNIN: "@@routes/signin",
};

export const actions = {
  redirectTo: (route, params = {}) => createSyncAction(route, params),
};
