import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HexColorPicker } from "react-colorful";
import "./css/HexColorPicker.css";
import { Container, Col, Row, Button } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { ColorDetail } from "./components/ColorDetail.js";
import { apiURL } from "./utils/api.js";
import { authToken } from "./utils/auth.js";

export const RGBlent = (props) => {
  const [pickerColor, setPickerColor] = useState("#80ff80");
  const [color, setColor] = useState("#80ff80");
  const [colorInfo, setColorInfo] = useState(undefined);
  useEffect(() => {
    const postHeaders = { "Content-Type": "application/json" };
    const token = authToken();
    if (token) postHeaders["Authentication"] = token;
    fetch(`${apiURL}/colorinfo`, {
      method: "POST",
      headers: postHeaders,
      body: JSON.stringify({ rgb_hex: color }),
    })
      .then((res) => res.json())
      .then(setColorInfo);
  }, [color]);

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
            <ColorDetail color={color} colorInfo={colorInfo} />
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
