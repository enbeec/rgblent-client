import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Container, Col, Row, Button } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Swatch } from "./components/Swatch.js";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");
  const [color, setColor] = useState("#80ff80");

  return (
    <Container>
      <Row>
        <Col>
          <Row style={{ margin: "auto", marginTop: "6rem" }}>
            <Col style={{ margin: "auto", marginTop: "6rem" }}>
              <HexColorPicker
                style={{ margin: "auto" }}
                color={pickerColor}
                onChange={setPickerColor}
              />
            </Col>
            <Col style={{ margin: "auto" }}>
              <Button onClick={() => setColor(pickerColor)}>Load Color</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "4rem" }}>
            <Swatch style={{ marginTop: "4rem" }} color={color} size={12} />
            <Container></Container>
          </Row>
          <Palette />
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
