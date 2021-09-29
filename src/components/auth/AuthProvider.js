import React, { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { authFetch } from "../../utils/fetch.js";
import { register, logout, login, authToken } from "../../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const client = useQueryClient();

  const profile = useQuery(["profile", authToken()], () =>
    authFetch("/profile").then((res) => res.json())
  );

  const defaults = useQuery("defaults", () =>
    Promise.all([
      authFetch("/default/colors", { noAuth: true }),
      authFetch("/default/palette", { noAuth: true }),
    ])
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

  const [newFavorite, setNewFavorite] = useState(null);
  const cancelFavorite = () => setNewFavorite(null);
  const startFavorite = (color) =>
    setNewFavorite({ rgb_hex: color, label: "" });
  const updateFavoriteLabel = (event) =>
    setNewFavorite({
      rgb_hex: newFavorite?.rgb_hex,
      label: event.target.value,
    });

  // TODO: useMutation

  const endFavorite = () => {
    // TODO: return a rejected promise and handle failure with split callbacks
    if (!newFavorite?.label) {
      return false;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFavorite),
    };
    return authFetch("/profile/favorite", options);
  };

  return (
    <AuthContext.Provider
      value={{ doLogin, doLogout, doRegister, profile, defaults }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
