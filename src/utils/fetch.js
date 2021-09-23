import { apiURL } from "./api.js";
import { authToken, isNobody } from "./auth.js";

export const resToJSON = (res) => res.json();

export const authFetch = (path, options) => {
  const url = apiURL + path;
  options = options || { headers: {} };

  if (!isNobody() && !options?.noAuth) {
    options.headers.Authorization = "Token " + authToken();
  }

  if (!options?.noJSON) {
    options.headers.Accept = "application/json";
  }
  return fetch(url, { ...options });
};

// TODO remove this once nothing depends on it anymore
export const noAuthFetch = authFetch;
