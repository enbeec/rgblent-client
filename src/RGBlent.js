import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Container, Col, Row } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Swatch } from "./components/Swatch.js";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");

  return (
    <Container>
      <Row>
        <Col>
          <HexColorPicker
            style={{ margin: "auto", marginTop: "2rem" }}
            color={pickerColor}
            onChange={setPickerColor}
          />
          <Swatch style={{ marginTop: "4rem" }} color={pickerColor} size={12} />
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
