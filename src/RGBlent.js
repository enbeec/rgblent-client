import React, { useRef } from "react";
import styled from "styled-components";
import { Container, Col, Row, Button } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { ColorDetail } from "./components/ColorDetail.js";
import { getColorInfo } from "./utils/fetch.js";
import { useQuery, useQueryClient } from "react-query";

const CURRENT_COLOR_INFO = "color_info";

export const RGBlent = (props) => {
  const client = useQueryClient();
  const color = useRef("#80ff80");
  const colorInfo = useQuery(CURRENT_COLOR_INFO, () => {
    return getColorInfo(color.current);
  });

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
                  color.current = pickerColor.current;
                  client.invalidateQueries(CURRENT_COLOR_INFO);
                }}
              >
                Load Color
              </Button>
            </Col>
          </LeftColumnRow>
          <LeftColumnRow className="detail__row">
            <ColorDetail
              color={color.current}
              colorInfo={colorInfo.data}
              colorInfoLoading={colorInfo.isLoading}
            />
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
