import React, { createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../utils/fetch.js";
import { doLogin, doLogout, isNobody } from "../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const getProfileOrDefaults = () => {
    if (isNobody()) {
      return noAuthFetch("/default/palette").then((res) => ({
        // this mimics how you would get a palette from a profile
        palettes: [res],
      }));
    } else {
      return authFetch("/profile").then((res) => res.json());
    }
  };

  const profile = useQuery("profileOrDefaults", getProfileOrDefaults);

  const login = (username, password) => {
    return noAuthFetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => {
      const response = res.json();
      if (response.success) {
        doLogin(response.token);
      }
    });
  };

  const logout = () => {
    doLogout();
  };

  return (
    <AuthContext.Provider value={{ login, logout, profile }}>
      {props.children}
    </AuthContext.Provider>
  );
};
