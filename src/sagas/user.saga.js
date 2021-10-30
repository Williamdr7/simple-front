/* eslint-disable require-yield */
import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import { toast } from "react-toastify";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";

const DEFAULT_URL = process.env.REACT_APP_API_URL;
function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `${DEFAULT_URL}/person/${values.id}`,
      method: "get",
    });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `${DEFAULT_URL}/person/${id}`,
      method: "put",
      body: values,
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
    toast.success("Usuário atualizado com sucesso!");
  },
});

const createUser = asyncFlow({
  actionGenerator: actions.createUser,
  transform: function* (payload) {
    return payload;
  },
  api: (values) => {
    return request({
      url: `${DEFAULT_URL}/person/create`,
      method: "post",
      body: values,
    });
  },
  postSuccess: function* () {
    toast.success("Usuário criado com sucesso!");
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  createUser.watcher(),
];
