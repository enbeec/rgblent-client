import React, { createContext, useState } from "react";
import { useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../utils/fetch.js";
import { authToken } from "../utils/auth.js";

export const ColorContext = createContext();

export const ColorProvider = (props) => {
  const client = useQueryClient();
  const KEYS = {
    CURRENT_COLOR: "color",
    CURRENT_COLOR_INFO: "color-info",
  };

  const [color, _setColor] = useState("#80ff80");

  const setColor = (newState) => {
    _setColor(newState);
    client.refetchQueries(KEYS.CURRENT_COLOR_INFO);
  };

  // there is one of these for each global fetch
  const getDefaultColors = () => {
    const path = "/default/colors";
    if (authToken()) return authFetch(path).then((res) => res.json());
    return noAuthFetch(path).then((res) => res.json());
  };

  const getColorInfo = (colorString) => {
    const path = "/colorinfo";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rgb_hex: colorString }),
    };
    if (authToken()) return authFetch(path, options).then((res) => res.json());
    return noAuthFetch(path, options).then((res) => res.json());
  };

  return (
    <ColorContext.Provider
      value={{
        getColorInfo,
        getDefaultColors,
        KEYS,
        color,
        setColor,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};
