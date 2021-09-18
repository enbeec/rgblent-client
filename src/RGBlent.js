import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Col, Row, Button } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { ColorDetail } from "./components/ColorDetail.js";
import { apiURL } from "./utils/api.js";
import { authToken } from "./utils/auth.js";
import { useQuery, useQueryClient } from "react-query";

const CURRENT_COLOR = "color";

export const RGBlent = (props) => {
  const client = useQueryClient();
  const color = (CURRENT_COLOR, () => pickerColor.current);
  // TODO (query): change to => useQuery(fetch)
  const [colorInfo, setColorInfo] = useState(undefined);
  // TODO (query): replaced by => useQuery
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
  }, [color.current]);

  const pickerColor = useRef("#80ff80");

  return (
    <Container>
      <Row>
        <LeftColumn>
          <LeftColumnRow className="picker__row">
            <Col>
              <Picker
                style={{ marginTop: "15%", marginBottom: "20%" }}
                colorRef={pickerColor}
              />
            </Col>
            <Col>
              <Button
                style={{ marginLeft: "10%" }}
                onClick={() => {
                  client.invalidateQueries(CURRENT_COLOR);
                }}
              >
                Load Color
              </Button>
            </Col>
          </LeftColumnRow>
          <LeftColumnRow className="detail__row">
            <ColorDetail color={color.data} colorInfo={colorInfo} />
          </LeftColumnRow>
          <LeftColumnRow className="palette__row">
            <Palette />
          </LeftColumnRow>
        </LeftColumn>
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

const LeftColumn = styled(Col)`
  margin-left: auto;
  margin-right: auto;
`;

const LeftColumnRow = styled(Row)`
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
`;

const MockSidebar = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 24rem;
  height: 90%;
  border-radius: 8px;
  background-color: darkgrey;
`;
