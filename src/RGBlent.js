import React, { useState } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import { Swatch } from "./components/Swatch.js";
import { Container, Col, Row } from "@bootstrap-styled/v4";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");

  const swatchProps = {
    size: 8,
    // TODO: this should be a spacing variable inside swatch
    style: { marginTop: "4rem" },
  };

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
