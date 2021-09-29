import React, { createContext, useState } from "react";
import { useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../utils/fetch.js";
import { isNobody, authToken } from "../utils/auth.js";

export const ColorContext = createContext();

export const ColorProvider = (props) => {
  const client = useQueryClient();
  const KEYS = {
    CURRENT_COLOR: "color",
    CURRENT_COLOR_INFO: "color-info",
    CURRENT_PALETTE: "palette",
  };

  const [color, _setColor] = useState("#80ff80");

  const setColor = (newState) => {
    _setColor(newState);
    client.refetchQueries(KEYS.CURRENT_COLOR_INFO);
  };

  const getDefaultColors = () => {
    const path = "/default/colors";
    return authFetch(path, { noAuth: true }).then((res) => res.json());
  };

  const getColorInfo = (colorString) => {
    const path = "/colorinfo";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rgb_hex: colorString }),
      noAuth: true,
    };
    return authFetch(path, options).then((res) => res.json());
  };

  const getPalette = (name) => {
    const path =
      name === "default" ? "/default/palette" : `/palettes?name=${name}`;
    return authFetch(path, { noAuth: true }).then((res) => res.json());
  };

  return (
    <ColorContext.Provider
      value={{
        getColorInfo,
        getDefaultColors,
        KEYS,
        color,
        setColor,
        getPalette,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};
