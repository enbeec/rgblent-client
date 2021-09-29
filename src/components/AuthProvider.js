import React, { useState, createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../utils/fetch.js";
import { tokenKey, authToken } from "../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const getProfile = () => authFetch("/profile").then((res) => res.json());

  const client = useQueryClient();

  const profile = useQuery(["profile", authToken()], getProfile);

  const getDefaults = () =>
    Promise.all([authFetch("/default/colors"), authFetch("/default/palette")])
      .then((res) => Promise.all(res))
      .then((res) => ({
        colors: res[0],
        palettes: [res[1]],
      }));

  const defaults = useQuery("defaults", getDefaults);

  const doRegister = (username, password, email, firstName, lastName) => {
    return noAuthFetch("/register", {
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
  };

  const doLogin = (username, password) => {
    return noAuthFetch("/login", {
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
  };

  const doLogout = () => localStorage.removeItem(tokenKey);

  return (
    <AuthContext.Provider
      value={{ doLogin, doLogout, doRegister, profile, defaults }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
