import React, { useContext } from "react";
import styled, { css } from "styled-components";
import {
  Card as CARD,
  CardHeader,
  Button as BUTTON,
  Col,
  Row,
} from "@bootstrap-styled/v4";
import {
  rgbInts,
  findL,
  findRatio,
  darkText,
  darkL,
  lightText,
  lightL,
} from "../../utils/color.js";
import { ColorContext } from "../color/ColorProvider";

export const Faves = ({ colors, ...props }) => {
  const { setColor } = useContext(ColorContext);
  return (
    <ContainerCard>
      <Row>
        {colors.length &&
          colors.map((c) => (
            <Col>
              <Card>
                <CardHeader>{c.label}</CardHeader>
                <Button
                  onClick={() => setColor(c.color.rgb_hex)}
                  color="overridden"
                  overrideBackground={c.color.rgb_hex}
                >
                  Load
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
    </ContainerCard>
  );
};

const Button = styled(BUTTON)`
  ${(props) => {
    const bgL = findL(props.overrideBackground);
    const minimumRatio = props.contrastRatio || 7;
    const textColor =
      props.overrideBackground === "#000000"
        ? lightText
        : findRatio(bgL, darkL) > minimumRatio
        ? lightText
        : darkText;
    return css`
      color: ${textColor};
      background: ${props.overrideBackground};
      margin: ${props.theme["$spacer"]};
    `;
  }}
`;

const ContainerCard = styled(CARD)`
  padding: ${(props) => props.theme["$spacer"]};
`;

const Card = styled(CARD)`
  margin: ${(props) => props.theme["$spacer"]};
`;
