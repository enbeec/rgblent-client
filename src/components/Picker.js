import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../css/HexColorPicker.css";
import { H4, Col, Row, Button as BUTTON } from "@bootstrap-styled/v4";
import { HexColorPicker } from "react-colorful";
import { AuthContext } from "./AuthProvider.js";
import { ColorContext } from "./ColorProvider.js";
import { isNobody } from "../utils/auth.js";

export const Picker = (props) => {
  const { startNewFavorite } = useContext(AuthContext);
  const { setColor } = useContext(ColorContext);
  const [pickerColor, setPickerColor] = useState("#80ff80");

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
