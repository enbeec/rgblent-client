import React, { useState } from "react";
import "../css/HexColorPicker.css";
import { Col, Button } from "@bootstrap-styled/v4";
import { useQueryClient } from "react-query";
import { HexColorPicker } from "react-colorful";
import { CURRENT_COLOR_INFO } from "../RGBlent.js";

export const Picker = ({ colorRef, ...props }) => {
  const client = useQueryClient();
  const [pickerColor, setPickerColorState] = useState(
    colorRef.current || "#80ff80"
  );

  const setPickerColor = (color) => {
    colorRef.current = color;
    setPickerColorState(color);
  };

  return (
    <>
      <Col>
        <HexColorPicker
          color={pickerColor}
          onChange={setPickerColor}
          {...props}
        />
      </Col>
      <Col>
        <Button
          style={{ marginLeft: "10%" }}
          onClick={() => {
            colorRef.current = pickerColor.current;
            client.invalidateQueries(CURRENT_COLOR_INFO);
          }}
        >
          Load Color
        </Button>
      </Col>
    </>
  );
};
