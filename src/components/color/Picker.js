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

  return (
    <>
      <Col>
        <HexColorPicker
          color={pickerColor}
          onChange={isEditing ? () => {} : setPickerColor}
          {...props}
        />
      </Col>
      <Col>
        <Row>
          {isEditing ? (
            <FakeButtonInput
              size="lg"
              maxLength={7}
              defaultValue={pickerColor}
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
            style={{ margin: "auto", marginLeft: "1rem" }}
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

// TODO look into styled-components keyframes partials
const makeFrames = (name, keyframesString) => css`
  @-webkit-keyframes ${name} {
    ${keyframesString}
  }

  @-moz-keyframes ${name} {
    ${keyframesString}
  }

  @-o-keyframes ${name} {
    ${keyframesString}
  }

  @keyframes ${name} {
    ${keyframesString}
  }
`;

const makeAnimation = ({
  duration = null,
  easing = null,
  delay = null,
  count = null,
  direction = null,
  fillMode = null,
  name = null,
}) => css`
	-webkit-animation: ${[duration, easing, delay, count, direction, fillMode, name]
    .filter(Boolean)
    .join(" ")};,

	-z-animation: ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};

	-o-animation: ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};

	animation:        ${[
    duration,
    easing,
    delay,
    count,
    direction,
    fillMode,
    name,
  ].join(" ")};
`;

const RainbowBackground = ({ brightLimit = false, alpha = 1 }) => css`
  background: linear-gradient(
    124deg,
    #ff2400,
    ${brightLimit ? "" : "#e81d1d, #e8b71d, #e3e81d,"} #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );

  background-size: 1800% 1800%;

  ${makeFrames(
    "rainbow",
    css`
      0% {
        background-position: 0% 82%;
      }
      50% {
        background-position: 100% 19%;
      }
      100% {
        background-position: 0% 82%;
      }
    `
  )}

  ${makeAnimation({
    name: "rainbow",
    direction: "alternate",
    duration: "18s",
    easing: "ease",
    count: "infinite",
  })}
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
        return findRatio(bgL, findL(darkText)) > minimumRatio
          ? darkText
          : lightText;
      }};
    `}
`;

const rgbInts = (rgb_hex) => ({
  r: parseInt(rgb_hex.slice(1, 3), 16),
  g: parseInt(rgb_hex.slice(3, 5), 16),
  b: parseInt(rgb_hex.slice(5, 7), 16),
});

// https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
const findL = (rgb_hex) => {
  const { r, g, b } = rgbInts(rgb_hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const findRatio = (L1, L2) => {
  const [small, big] = [L1, L2].sort((a, b) => a - b);
  return big + 0.5 / small + 0.5;
};

const darkText = "#010101";
const darkL = findL(darkText);
const lightText = "#fefefe";
const lightL = findL(lightText);
