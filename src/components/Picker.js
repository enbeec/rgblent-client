import React, { useState, useContext } from "react";
import styled from "styled-components";
import "../css/HexColorPicker.css";
import { H4, Col, Row, Button as BUTTON } from "@bootstrap-styled/v4";
import { useQueryClient } from "react-query";
import { HexColorPicker } from "react-colorful";
import { ColorContext } from "./ColorProvider.js";

export const Picker = (props) => {
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
        <H4 style={{ textAlign: "center" }}> {pickerColor}</H4>
        <Row style={{ marginTop: "10%" }}>
          <Button
            onClick={() => {
              setColor(pickerColor);
              client.refetchQueries(KEYS.CURRENT_COLOR_INFO, { active: true });
            }}
          >
            Load This Color
          </Button>
          <Button onClick={() => {}}>Favorite this Color</Button>
        </Row>
      </Col>
    </>
  );
};

const Button = styled(BUTTON)`
  margin-right: 2%;
  margin-bottom: 2%;
`;
