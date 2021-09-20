import React, { useState, useContext } from "react";
import "../css/HexColorPicker.css";
import { Col, Button } from "@bootstrap-styled/v4";
import { useQueryClient } from "react-query";
import { HexColorPicker } from "react-colorful";
import { ColorContext } from "./ColorProvider.js";

export const Picker = ({ colorRef, ...props }) => {
  const { setColor, KEYS } = useContext(ColorContext);
  const [pickerColor, setPickerColor] = useState("#80ff80");
  useContext(ColorContext);
  const client = useQueryClient();

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
            setColor(pickerColor);
            client.invalidateQueries(KEYS.CURRENT_COLOR_INFO);
          }}
        >
          Load Color
        </Button>
      </Col>
    </>
  );
};
