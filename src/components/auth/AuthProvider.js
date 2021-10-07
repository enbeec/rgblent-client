import React, { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { authFetch, STATUS } from "../../utils/fetch.js";
import { KEYS } from "../../utils/query.js";
import {
  registerFetch,
  loginFetch,
  logout,
  authToken,
} from "../../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const client = useQueryClient();

  const profile = useQuery(
    [KEYS.PROFILE, authToken()],
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
    KEYS.DEFAULTS,
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
    registerFetch(username, password, email, firstName, lastName).then(() =>
      client.refetchQueries("profile")
    );

  const doLogin = (username, password) =>
    loginFetch(username, password).then(() => client.refetchQueries("profile"));

  const doLogout = () => {
    logout();
    client.refetchQueries(KEYS.PROFILE);
    client.refetchQueries(KEYS.CURRENT_PALETTE); // this resets the palette
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
      onSuccess: () => client.refetchQueries(KEYS.PROFILE),
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

  const endFavorite = () => {
    if (!newFavorite.label) {
      return Promise.reject(new Error("missing name")); // down, Zalgo!
    }

    return createFavorite.mutateAsync(newFavorite).then((res) => {
      if (res.status === STATUS.ALREADY_EXISTS) {
        return res
          .json()
          .then((data) =>
            Promise.reject(
              new Error(
                `favorite already exists: ${data.label} (${data.color.rgb_hex})`
              )
            )
          );
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
