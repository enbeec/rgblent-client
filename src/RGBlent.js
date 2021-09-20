import React from "react";
import styled from "styled-components";
import { Container, Col, Row } from "@bootstrap-styled/v4";
import { ColorProvider } from "./components/ColorProvider.js";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { Detail } from "./components/Detail.js";

export const RGBlent = (props) => {
  return (
    <ColorProvider>
      <Container>
        <Row>
          <LeftColumn>
            <LeftColumnRow className="picker__row">
              <Picker style={{ marginTop: "15%", marginBottom: "20%" }} />
            </LeftColumnRow>
            <LeftColumnRow className="detail__row">
              <Detail />
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
    </ColorProvider>
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
