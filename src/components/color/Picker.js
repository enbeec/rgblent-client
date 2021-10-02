import React, { useState, useContext } from "react";
import styled from "styled-components";
import "./Picker.css";
import {
  Input,
  Col,
  Row,
  Tooltip,
  Button as BUTTON,
} from "@bootstrap-styled/v4";
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

  const [isEditing, setIsEditing] = useState(false);
  const startEditing = () => setIsEditing;

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
          {isEditing ? (
            <Input
              size="lg"
              maxLength={7}
              style={{
                borderRadius: "4px",
                marginLeft: 0,
                marginRight: 0,
                //marginTop: "0.8rem",
                //marginBottom: "0.8rem",
                width: "7.5rem",
                paddingRight: "1.2rem",
                paddingLeft: "1.5rem",
                paddingTop: "0.6rem",
                paddingBottom: "0.6rem",
                fontSize: "1.25rem",
              }}
              defaultValue={pickerColor}
            />
          ) : (
            <CopyButton
              id="picker-rgh_hex__copybutton"
              tooltipProps={{ placement: "left" }}
              buttonProps={{ size: "lg" }}
              children={pickerColor}
            />
          )}
          <Button
            style={{ margin: "auto", marginLeft: "1rem" }}
            size="sm"
            color="info"
            onClick={() => setIsEditing(!isEditing)}
            children="Edit"
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
