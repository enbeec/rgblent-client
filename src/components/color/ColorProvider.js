import React, { createContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch, noAuthFetch } from "../../utils/fetch.js";
import { isNobody, authToken } from "../../utils/auth.js";
import { KEYS } from "../../utils/query.js";

export const ColorContext = createContext();

export const ColorProvider = (props) => {
  const client = useQueryClient();

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

  return (
    <ColorContext.Provider
      value={{
        getColorInfo,
        getDefaultColors,
        color,
        setColor,
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
};