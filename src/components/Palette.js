import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Swatch } from "./Swatch.js";
import {
  Col,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
} from "@bootstrap-styled/v4";
import { ColorContext } from "./ColorProvider.js";

export const Palette = (props) => {
  const { color, setColor } = useContext(ColorContext);
  const [colors, setColors] = useState([
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
    "#8080ff",
  ]);
  const swatchProps = {
    size: 8,
    style: { margin: "8%", display: "inline-block" },
  };

  // FIXME: this is very forced styling
  const colProps = {
    style: { margin: "auto", paddingRight: "4%" },
  };

  const loadFunc = (index) => () => {
    setColors(
      colors.map((this_color, this_index) =>
        index === this_index ? color : this_color
      )
    );
  };

  const Color = (props) => {
    const loadColor = () => setColor(colors[props.index]);
    return (
      <Col {...colProps}>
        <Card>
          <CardHeader>{props.label || props.color}</CardHeader>
          <Swatch
            {...props}
            {...swatchProps}
            dropdownExtras={[{ children: "View Details", onClick: loadColor }]}
            onDoubleClick={loadColor}
          />
          <CardFooter>
            <FlexRow>
              {props.label ? props.color : <Button>Save</Button>}
              <Button onClick={loadFunc(props.index)}>Load</Button>
            </FlexRow>
          </CardFooter>
        </Card>
      </Col>
    );
  };

  return (
    <>
      {colors.map((color, index) => (
        <Color key={index} index={index} color={colors[index]} />
      ))}
    </>
  );
};

const Button = styled(BUTTON)`
  scale: 0.9;
`;

const Card = styled(CARD)`
  margin-bottom: 4%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0%;
  margin-right: 0%;
`;
