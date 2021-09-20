import React from "react";
import styled from "styled-components";
import { Swatch } from "./Swatch.js";
import {
  Col,
  Row,
  Button as BUTTON,
  Card as CARD,
  CardHeader,
  CardFooter,
} from "@bootstrap-styled/v4";

export const Palette = (props) => {
  const swatchProps = {
    size: 8,
    style: { margin: "8%", display: "inline-block" },
  };

  // FIXME: this is very forced styling
  const colProps = {
    style: { margin: "auto", paddingRight: "4%" },
  };

  const Color = (props) => {
    return (
      <Col {...colProps}>
        <Card>
          <CardHeader>{props.label || props.color}</CardHeader>
          <Swatch {...props} {...swatchProps} />
          <CardFooter>
            {props.label ? props.color : <Button>Save</Button>}
          </CardFooter>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
      <Color color={"#8080ff"} />
    </>
  );
};

const Button = styled(BUTTON)`
  scale: 0.9;
`;

const Card = styled(CARD)`
  margin-bottom: 4%;
`;
