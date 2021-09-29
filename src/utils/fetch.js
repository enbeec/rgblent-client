import { apiURL } from "./api.js";
import { authToken } from "./auth.js";

export const noAuthFetch = (path, options) => {
  return authFetch(path, { ...options, noAuth: true });
};

export const authFetch = (path, options) => {
  const url = apiURL + path;
  options = options || {};
  options.headers = options?.headers || {};

  if (!options?.noAuth) {
    options.headers.Authorization = `Token ${authToken()}`;
  }

  return fetch(url, { ...options });
};
