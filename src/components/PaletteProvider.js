import React, { createContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export const PaletteProvider = createContext();

export const PaletteProvider = (props) => {
  const client = useQueryClient();
};
