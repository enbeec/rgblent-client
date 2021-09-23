import React, { useState, createContext, useEffect } from "react";
import { resToJSON } from "../utils/fetch.js";
import { tokenKey, isNobody, authToken } from "../utils/auth.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const apiURL = "http://localhost:8000";
  const [profileOrDefaults, setProfileOrDefaults] = useState(
    isNobody ? "defaults" : "profile"
  );
  const getProfileOrDefaults = () => {
    if (profileOrDefaults === "defaults") {
      return fetch(apiURL + "/default/palette")
        .then(resToJSON)
        .then((palette) => ({
          name: "defaults",
          palettes: [palette],
        }));
    } else {
      return fetch(apiURL + "/profile", {
        headers: { Authentication: "Token " + authToken() },
      }).then(resToJSON);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    colors: [],
    palettes: [],
  });
  useEffect(() => {
    setIsLoading(true);
    setProfile({ name: "loading" });
    getProfileOrDefaults()
      .then(setProfile)
      .then(() => setIsLoading(false));
  }, [profileOrDefaults]);

  const doRegister = (username, password, email, firstName, lastName) => {
    console.log(password);
    return fetch(apiURL + "/register", {
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
      .then(resToJSON)
      .then((data) => {
        if (data.success) {
          localStorage.setItem(tokenKey, data.token);
        }
      })
      .then(() => {
        setProfileOrDefaults("profile");
      });
  };

  const doLogin = (username, password) => {
    return fetch(apiURL + "/login", {
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
      });
  };

  const doLogout = () => {
    localStorage.removeItem(tokenKey);
    setProfileOrDefaults("defaults");
  };

  return (
    <AuthContext.Provider
      value={{ doLogin, doLogout, doRegister, profile, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
