import React from "react";
import { Swatch } from "./Swatch.js";
import { Container, Col, Row } from "@bootstrap-styled/v4";

export const Palette = (props) => {
  const swatchProps = {
    size: 8,
    // TODO: this should be a spacing variable inside swatch
    style: { marginTop: "4rem" },
  };

  return (
    <Container>
      <Row>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
      </Row>
      <Row style={{ marginBottom: "6rem" }}>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
      </Row>
    </Container>
  );
};
