import React, { useState, useContext } from "react";
import styled from "styled-components";
import "./Picker.css";
import { Col, Row, Tooltip, Button as BUTTON } from "@bootstrap-styled/v4";
import { HexColorPicker } from "react-colorful";
import { ColorContext } from "./ColorProvider.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { isNobody } from "../../utils/auth.js";
import { CopyButton } from "../reusable/CopyButton.js";

export const Picker = (props) => {
  const { setColor } = useContext(ColorContext);
  const { startFavorite } = useContext(AuthContext);
  const [pickerColor, setPickerColor] = useState("#80ff80");

  const [tooltipOpen, setToolTipOpen] = useState(false);
  const toggleTooltipOpen = () => setToolTipOpen(!tooltipOpen);

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
        <Row>
          <CopyButton
            id="picker-rgh_hex__copybutton"
            tooltipProps={{ placement: "right" }}
            buttonProps={{ size: "lg" }}
            children={pickerColor}
          />
        </Row>
        <Row style={{ marginTop: "10%" }}>
          <Button onClick={() => setColor(pickerColor)}>Load This Color</Button>
          <Button
            onClick={() => {
              startFavorite(pickerColor);
            }}
            disabled={isNobody()}
            id="picker__favorite-button"
          >
            Favorite this Color
          </Button>
        </Row>
      </Col>
      {isNobody() && (
        <>
          <Tooltip
            isOpen={tooltipOpen}
            toggle={toggleTooltipOpen}
            target="picker__favorite-button"
          >
            Login/Register to favorite colors
          </Tooltip>
        </>
      )}
    </>
  );
};

const Button = styled(BUTTON)`
  margin-right: 2%;
  margin-bottom: 2%;
`;
