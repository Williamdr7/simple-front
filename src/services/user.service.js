import { request } from "../utils/api";
const DEFAULT_URL = process.env.REACT_APP_API_URL;

export async function login(data) {
  try {
    const response = await request({
      url: `${DEFAULT_URL}/user/login`,
      method: "post",
      body: { ...data },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function register(data) {
  try {
    const response = await request({
      url: `${DEFAULT_URL}/user/register`,
      method: "post",
      body: { ...data },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}
