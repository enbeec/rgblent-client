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
      // as soon as a user's profile is unloaded, it is released for Garbage Collection
      // TODO determine if this is "good enough" compared to how other web apps cache user info
      cacheTime: 0,
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

  const [newFavorite, setNewFavorite] = useState(null);
  const cancelFavorite = () => setNewFavorite(null);

  const startFavorite = (color) =>
    setNewFavorite({ rgb_hex: color, label: "" });

  const updateFavoriteLabel = (event) =>
    setNewFavorite({
      rgb_hex: newFavorite.rgb_hex,
      label: event.target.value,
    });

  const STATUS_CONFLICT = 409; //TODO get this into utils
  const endFavorite = () => {
    if (!newFavorite.label) return Promise.reject(new Error("missing name")); // down, Zalgo!

    return createFavorite.mutateAsync(newFavorite).then((res) => {
      debugger;
      if (res.status === STATUS_CONFLICT) {
        return res.json().then((data) => {
          throw new Error(
            `favorite already exists: ${data.label} (${data.color.rgb_hex})`
          );
        });
      } else {
        return res.json().then(() => setNewFavorite(null));
      }
    });
  };

  const favoriteIsSubmitting = () => createFavorite.isLoading;

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
        favoriteIsSubmitting,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
