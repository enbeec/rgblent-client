import React, { useState } from "react";
import "../css/HexColorPicker.css";
import { HexColorPicker } from "react-colorful";

export const Picker = ({ colorRef, ...props }) => {
  const [pickerColor, setPickerColorState] = useState("#80ff80");

  const setPickerColor = (color) => {
    colorRef.current = color;
    setPickerColorState(color);
  };

  return (
    <HexColorPicker color={pickerColor} onChange={setPickerColor} {...props} />
  );
};
