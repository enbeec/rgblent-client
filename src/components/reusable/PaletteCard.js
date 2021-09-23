import React, { useContext } from "react";
import { Row, Col, Card, CardText } from "@bootstrap-styled/v4";
import { ColorContext } from "../ColorProvider.js";
import { Swatch } from "./Swatch.js";

export const PaletteCard = ({ palette, ...props }) => {
  const { setColor } = useContext(ColorContext);
  return (
    <Card>
      <CardText style={{ textAlign: "center", marginBottom: 0 }}>
        {palette.name}
      </CardText>
      <Row style={{ padding: "1rem" }}>
        {palette.colors.map((color) => (
          <Col>
            <Swatch
              style={{ margin: "0.5em" }}
              noHover
              color={color.color.rgb_hex}
              size={2}
              onDoubleClick={() => setColor(color.color.rgb_hex)}
            />
            <CardText style={{ textAlign: "center", fontSize: 11 }}>
              {color.label}
            </CardText>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
