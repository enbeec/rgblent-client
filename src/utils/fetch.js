import { apiURL } from "./api.js";
import { authToken } from "./auth.js";

export const noAuthFetch = (path, options) => {
  const url = apiURL + path;
  return fetch(url, { ...options });
};

export const authFetch = (path, options) => {
  const url = apiURL + path;
  options.headers.Authentication = "Token " + authToken();
  return fetch(url, { ...options });
};
