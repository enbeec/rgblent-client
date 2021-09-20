import React from "react";
import { Swatch } from "./Swatch.js";
import { Col, Row } from "@bootstrap-styled/v4";

export const Palette = (props) => {
  const swatchProps = {
    size: 8,
  };

  const colProps = {
    style: { margin: "auto" },
  };

  return (
    <>
      <Row>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
      </Row>
      <Row style={{ marginTop: "5%", marginBottom: "15%" }}>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
        <Col {...colProps}>
          <Swatch color={"#8080ff"} {...swatchProps} />
        </Col>
      </Row>
    </>
  );
};
