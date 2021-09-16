import React from "react";
import { Swatch } from "./Swatch.js";
import { Container, Col, Row } from "@bootstrap-styled/v4";

export const Palette = (props) => {
  const swatchProps = {
    size: 8,
  };

  return (
    <>
      <Row style={{ marginTop: "10%" }}>
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
      <Row style={{ marginTop: "5%", marginBottom: "15%" }}>
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
    </>
  );
};
