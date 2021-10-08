import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
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
import { ColorHistory } from "./ColorHistory.js";
import { AuthContext } from "../auth/AuthProvider.js";
import { isNobody } from "../../utils/auth.js";
import {
  rgbInts,
  findL,
  findRatio,
  darkText,
  darkL,
  lightText,
  lightL,
} from "../../utils/color.js";
import { CopyButton } from "../reusable/CopyButton.js";
import { RainbowBackground } from "../../utils/animation.js";

export const Picker = (props) => {
  const { setColor } = useContext(ColorContext);
  const { startFavorite } = useContext(AuthContext);
  const [pickerColor, setPickerColor] = useState("#80ff80");
  const [contrastColor, setContrastColor] = useState(darkText);

  const [tooltipOpen, setToolTipOpen] = useState(false);
  const toggleTooltipOpen = () => setToolTipOpen(!tooltipOpen);

  const [isEditing, setIsEditing] = useState(false);
  const [newColor, setNewColor] = useState(null);
  const startEditing = () => {
    setNewColor(pickerColor);
    setIsEditing(true);
  };

  const endEditing = () => {
    setPickerColor(newColor);
    setNewColor(null);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewColor(null);
  };

  return (
    <>
      <Col>
        <HexColorPicker
          color={pickerColor}
          onChange={
            isEditing
              ? () => {}
              : (color) => {
                  setPickerColor(color);
                  setContrastColor(
                    findRatio(findL(pickerColor), darkL) > 10
                      ? lightText
                      : darkText
                  );
                }
          }
          {...props}
        />
      </Col>
      <Col>
        <Row style={{ justifyContent: "center" }}>
          {isEditing ? (
            <FakeButtonInput
              size="lg"
              maxLength={7}
              defaultValue={pickerColor}
              // TODO: proper validation
              onChange={(e) => setNewColor(e.target.value)}
              rainbow={true}
              overrideBackground={newColor !== pickerColor && newColor}
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
            style={{
              margin: "auto",
              marginLeft: "1rem",
              marginRight: 0,
            }}
            size="sm"
            color="info"
            onClick={isEditing ? endEditing : startEditing}
            disabled={
              isEditing
                ? !newColor.startsWith("#") || newColor.length !== 7
                : false
            }
            children={isEditing ? "Save" : "Edit"}
          />
          {isEditing && (
            <Button
              style={{ margin: "auto", marginLeft: "0.5rem" }}
              size="sm"
              color="danger"
              onClick={cancelEditing}
              children="Cancel"
            />
          )}
        </Row>
        <Row style={{ justifyContent: "center", marginTop: "10%" }}>
          <Button
            onClick={() => setColor(pickerColor)}
            style={{
              backgroundColor: pickerColor,
              color: contrastColor,
            }}
          >
            Load This Color
          </Button>
          <Button
            onClick={() => {
              startFavorite(pickerColor);
            }}
            disabled={isNobody()}
            id="picker__favorite-button"
            style={{
              backgroundColor: pickerColor,
              color: contrastColor,
            }}
          >
            Favorite this Color
          </Button>
        </Row>
        <ColorHistory />
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

const FakeButtonInput = styled(Input)`
  border: 0px;
  border-radius: 5px;
  margin-left: 0;
  margin-right: 0;
  width: 7.4rem;
  padding-right: 1.2rem;
  padding-left: 1.5rem;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  font-size: 1.25rem;
  color: #909090;
  /* https://codepen.io/nohoid/pen/kIfto */
  ${RainbowBackground({ brightLimit: true })}
  transition: background-color 0.5s ease;
  ${(props) =>
    props.overrideBackground &&
    css`
      background: ${props.overrideBackground};
      color: ${(props) => {
        if (props.overrideBackground === "#000000") return lightText;
        const bgL = findL(props.overrideBackground);
        const minimumRatio = props.contrastRatio || 7;
        return findRatio(bgL, darkL) > minimumRatio ? lightText : darkText;
      }};
    `}
`;
