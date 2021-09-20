import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Container, Col, Row } from "@bootstrap-styled/v4";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { Detail } from "./components/Detail.js";

// query keys go here
export const CURRENT_COLOR_INFO = "color_info";

export const RGBlent = (props) => {
  const pickerColor = useRef("#80ff80");
  const color = useRef("#80ff80");

  useEffect(() => {}, [color]);

  return (
    <Container>
      <Row>
        <LeftColumn>
          <LeftColumnRow className="picker__row">
            <Picker
              style={{ marginTop: "15%", marginBottom: "20%" }}
              colorRef={pickerColor}
            />
          </LeftColumnRow>
          <LeftColumnRow className="detail__row">
            <Detail color={color.current} />
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
