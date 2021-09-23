import { apiURL } from "./api.js";
import { authToken, isNobody } from "./auth.js";

export const resToJSON = (res) => res.json();

export const authFetch = (path, options) => {
  const url = apiURL + path;
  options = options || {};
  if (!isNobody()) {
    options.headers.Authentication = "Token " + authToken();
  }
  return fetch(url, { ...options });
};

// TODO remove this once nothing depends on it anymore
export const noAuthFetch = authFetch;
