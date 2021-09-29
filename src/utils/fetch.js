import { apiURL } from "./api.js";
import { authToken } from "./auth.js";

export const noAuthFetch = (path, options) => {
  return authFetch(path, { ...options, noAuth: true });
};

export const authFetch = (path, { noJSON, noAuth, headers, ...options }) => {
  const url = apiURL + path;

  if (!noAuth) {
    headers = headers || {};
    options.headers.Authentication = "Token " + authToken();
  }

  return fetch(url, { ...options, headers: { ...headers } });
};
