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
    getProfileOrDefaults,
    {
      staleTime: Infinity,
    }
  );
  const client = useQueryClient();
  const profileStale = () => {
    client.invalidateQueries("getProfileOrDefaults");
  };

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
      })
      .then(() => {
        setProfileOrDefaults("profile");
        profileStale();
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
    <AuthContext.Provider
      value={{ doLogin, doLogout, doRegister, profile, profileStale }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
