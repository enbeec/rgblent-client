import React, { createContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { authFetch } from "../../utils/fetch.js";
import { KEYS } from "../../utils/query.js";

export const PaletteContext = createContext();

export const PaletteProvider = (props) => {
  const client = useQueryClient();

  const getPalette = (name) => {
    const path =
      name === "default" ? "/default/palette" : `/palettes?name=${name}`;
    return authFetch(path, { noAuth: true }).then((res) => res.json());
  };

  return (
    <PaletteContext.Provider
      value={{
        getPalette,
      }}
    >
      {props.children}
    </PaletteContext.Provider>
  );
};
