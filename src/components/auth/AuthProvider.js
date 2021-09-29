import React, { createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch } from "../../utils/fetch.js";
import { register, logout, login, authToken } from "../../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const client = useQueryClient();

  const profile = useQuery(["profile", authToken()], () =>
    authFetch("/profile").then((res) => res.json())
  );

  const defaults = useQuery("defaults", () =>
    Promise.all([authFetch("/default/colors"), authFetch("/default/palette")])
      .then((res) => Promise.all(res))
      .then((res) => ({
        colors: res[0],
        palettes: [res[1]],
      }))
  );

  const doRegister = (username, password, email, firstName, lastName) =>
    register(username, password, email, firstName, lastName).then(() =>
      client.refetchQueries("profile")
    );

  const doLogin = (username, password) =>
    login(username, password).then(() => client.refetchQueries("profile"));

  const doLogout = () => {
    logout();
    client.refetchQueries("profile");
  };

  return (
    <AuthContext.Provider
      value={{ doLogin, doLogout, doRegister, profile, defaults }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
