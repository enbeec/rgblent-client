import React, { useState, createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../utils/fetch.js";
import { tokenKey } from "../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [profileOrDefaults, setProfileOrDefaults] = useState("defaults");
  const getProfileOrDefaults = () => {
    if (profileOrDefaults === "defaults") {
      return noAuthFetch("/default/palette").then((res) => ({
        // this mimics how you would get a palette from a profile
        palettes: [res],
      }));
    } else {
      return authFetch("/profile").then((res) => res.json());
    }
  };
  const profile = useQuery(
    ["profileOrDefaults", profileOrDefaults],
    getProfileOrDefaults
  );
  const client = useQueryClient();
  const profileStale = () => {
    client.invalidateQueries("getProfileOrDefaults");
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
        console.log("got response: ", data);
        if (data.success) {
          console.log("logging in with token: ", data.token);
          localStorage.setItem(tokenKey, data.token);
        }
      })
      .then(() => {
        setProfileOrDefaults("profile");
        profileStale();
      });
  };

  const doLogout = () => {
    localStorage.removeItem(tokenKey);
    setProfileOrDefaults("defaults");
    profileStale();
  };

  return (
    <AuthContext.Provider value={{ doLogin, doLogout, profile, profileStale }}>
      {props.children}
    </AuthContext.Provider>
  );
};
