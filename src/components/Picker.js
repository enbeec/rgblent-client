import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../css/HexColorPicker.css";
import { H4, Col, Row, Button as BUTTON } from "@bootstrap-styled/v4";
import { HexColorPicker } from "react-colorful";
import { ColorContext } from "./ColorProvider.js";

export const Picker = (props) => {
  const { setColor, startNewFavorite } = useContext(ColorContext);
  const [pickerColor, setPickerColor] = useState("#80ff80");
  useContext(ColorContext);

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
        <H4> {pickerColor}</H4>
        <Row style={{ marginTop: "10%" }}>
          <Button onClick={() => setColor(pickerColor)}>Load This Color</Button>
          <Button onClick={() => startNewFavorite(pickerColor)}>
            Favorite this Color
          </Button>
        </Row>
      </Col>
    </>
  );
};

const Button = styled(BUTTON)`
  margin-right: 2%;
  margin-bottom: 2%;
`;
