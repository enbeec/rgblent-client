import { authFetch } from "./fetch.js";

export const tokenKey = "rgblent_token";
export const authToken = () => localStorage.getItem(tokenKey);
export const isNobody = () => !authToken();

export const logout = () => localStorage.removeItem(tokenKey);
export const login = (username, password) =>
  authFetch("/login", {
    noAuth: true,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem(tokenKey, data.token);
      }
    });

export const register = (username, password, email, firstName, lastName) =>
  authFetch("/register", {
    noAuth: true,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem(tokenKey, data.token);
      }
    });
