import React, { createContext, useState } from "react";
import { useQueryClient } from "react-query";
import { authFetch } from "../utils/fetch.js";

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
    };
    return authFetch(path, options).then((res) => res.json());
  };

  const [paletteName, _setPaletteName] = useState("default");

  const setPaletteName = (name) => {
    _setPaletteName(name);
    client.invalidateQueries(KEYS.CURRENT_PALETTE);
  };

  const getPalette = (name) => {
    const path =
      name === "default" ? "/default/palette" : `/palettes?name=${name}`;
    return authFetch(path).then((res) => res.json());
  };

  return (
    <ColorContext.Provider
      value={{
        getColorInfo,
        getDefaultColors,
        KEYS,
        color,
        setColor,
        paletteName,
        setPaletteName,
        getPalette,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};
