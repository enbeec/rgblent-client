import React, { useContext } from "react"
import { Row, Col, Card, CardText } from "@bootstrap-styled/v4"
import { ColorContext } from "../color/ColorProvider.js"
import { Swatch } from "../color/Swatch.js"

export const MiniPalette = ({palette, ...props}) => {
	const { setColor } = useContext(ColorContext);
  return palette ? (
    <Card>
      {palette.name !== "default" && (
        <CardText style={{ textAlign: "center", marginBottom: 0 }}>
          {palette.name}
        </CardText>
      )}
      <Row style={{ padding: "1.2em" }}>
        {palette.colors.map((color) => (
          <Col key={color?.label || color.color.rgb_hex}>
            <Swatch
              style={{ margin: "0.6em" }}
              noHover
              color={color.color.rgb_hex}
              size={3}
              onDoubleClick={() => setColor(color.color.rgb_hex)}
            />
            <CardText style={{ textAlign: "center", fontSize: 13 }}>
              {color.label}
            </CardText>
          </Col>
        ))}
      </Row>
    </Card>
	) : null
}
