import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Container, Col, Row, Button } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Swatch } from "./components/Swatch.js";
import { ColorDetail } from "./components/ColorDetail.js";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");
  const [color, setColor] = useState("#80ff80");

  return (
    <Container>
      <Row>
        <Col>
          <Row className="picker__" style={{ marginTop: "15%" }}>
            <Col style={{ margin: "auto" }}>
              <HexColorPicker
                style={{ margin: "auto" }}
                color={pickerColor}
                onChange={setPickerColor}
              />
            </Col>
            <Col>
              <Button onClick={() => setColor(pickerColor)}>Load Color</Button>
            </Col>
          </Row>
          <Row className="detail__row" style={{ marginTop: "10%" }}>
            <ColorDetail color={color} />
          </Row>
          <Row className="palette__row">
            <Palette />
          </Row>
        </Col>
        <RightColumn>
          <MockSidebar />
        </RightColumn>
      </Row>
    </Container>
  );
};

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const MockSidebar = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 24rem;
  height: 90%;
  border-radius: 8px;
  background-color: darkgrey;
`;
