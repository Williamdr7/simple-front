const axios = require("axios");
const Cookie = require("js-cookie");
const instance = axios.create({
  timeout: 120000,
  withCredentials: false,
});

export const request = async ({
  isMock,
  url,
  destiny,
  method,
  headers = undefined,
  queryParams = {},
  body,
  ...other
}) => {
  Object.keys(queryParams).forEach(
    (key) =>
      queryParams.hasOwnProperty(key) &&
      !queryParams[key] &&
      queryParams[key] !== false &&
      delete queryParams[key]
  );

  return instance.request({
    url,
    method,
    headers: {
      Authorization: `Bearer ${Cookie.get("accessToken")}`,
      ...headers,
    },
    ...other,
    params: queryParams,
    data: body,
  });
};

export default instance;

export const handleApiErrors = (response) => response;
