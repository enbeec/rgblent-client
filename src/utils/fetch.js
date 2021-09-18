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

// there is one of these for each global fetch
export const getDefaultColors = () => {
  const path = "/default/colors";
  if (authToken()) return authFetch(path).then((res) => res.json());
  return noAuthFetch(path).then((res) => res.json());
};
