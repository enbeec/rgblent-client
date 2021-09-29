import React, { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { authFetch } from "../../utils/fetch.js";
import { register, logout, login, authToken } from "../../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const client = useQueryClient();

  const profile = useQuery(
    ["profile", authToken()],
    () => {
      if (!authToken()) return Promise.resolve(null);
      return authFetch("/profile").then((res) => res.json());
    },
    {
      // profiles are only stale if you mutate them yourself
      staleTime: Infinity,
    }
  );

  const defaults = useQuery(
    "defaults",
    () =>
      Promise.all([
        authFetch("/default/colors", { noAuth: true }),
        authFetch("/default/palette", { noAuth: true }),
      ]).then((ress) => Promise.all(ress.map((res) => res.json()))),
    {
      staleTime: Infinity,
    }
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

  const createFavorite = useMutation(
    (favoriteObj) =>
      authFetch("/profile/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteObj),
      }),
    {
      // mutationKey: "favorite-create",
      onSuccess: () => client.refetchQueries("profile"),
    }
  );

  // while a favorite can be "started" from the Picker or any Swatch,
  // 	it can only be "finished" in the NameWindow by naming and submitting it
  // 	hence the "lifecycle" living in the provider
  const [newFavorite, setNewFavorite] = useState(null);
  const cancelFavorite = () => setNewFavorite(null);
  const startFavorite = (color) =>
    setNewFavorite({ rgb_hex: color, label: "" });
  const updateFavoriteLabel = (event) =>
    setNewFavorite({
      rgb_hex: newFavorite?.rgb_hex,
      label: event.target.value,
    });
  const endFavorite = () => {
    if (!newFavorite?.label) return Promise.reject("missing name"); // down, Zalgo!
    return createFavorite
      .mutateAsync(newFavorite)
      .then(() => setNewFavorite(null));
  };

  return (
    <AuthContext.Provider
      value={{
        doLogin,
        doLogout,
        doRegister,
        profile,
        defaults,
        startFavorite,
        updateFavoriteLabel,
        endFavorite,
        cancelFavorite,
        newFavorite,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
