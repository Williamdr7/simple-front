/* eslint-disable require-yield */
import { put } from "redux-saga/effects";
import asyncFlow from "./asyncHandler";
import { toast } from "react-toastify";
import { actions } from "../reducers/home.actions";
import { request } from "../utils/api";
const DEFAULT_URL = process.env.REACT_APP_API_URL;
function* applicationWatcher() {
  yield put(actions.loadUsers.request());
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => {
    return request({
      url: `${DEFAULT_URL}/persons`,
      method: "get",
    });
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* (payload) {
    return payload;
  },
  api: (id) => {
    return request({
      url: `${DEFAULT_URL}/person/${id}`,
      method: "delete",
    });
  },
  postSuccess: function* () {
    toast.success("Usuário deletado com sucesso!");
  },
});

export const sagas = [
  applicationWatcher(),
  loadUsers.watcher(),
  deleteUser.watcher(),
];
