import React from "react";
import styled from "styled-components";
import { Container, Col, Row, Hr } from "@bootstrap-styled/v4";
import { ColorProvider } from "./components/ColorProvider.js";
import { Palette } from "./components/Palette.js";
import { Picker } from "./components/Picker.js";
import { Detail } from "./components/Detail.js";
import { Auth } from "./components/Auth.js";

export const RGBlent = (props) => {
  return (
    <ColorProvider>
      <Container>
        <Row>
          <LeftColumn>
            <LeftColumnRow className="picker__row">
              <Picker style={{ marginTop: "10%", marginBottom: "0%" }} />
            </LeftColumnRow>
            <LeftColumnRow className="detail__row">
              <Detail />
            </LeftColumnRow>
            {/* Palette renders it's own row */}
            <Hr />
            <Palette />
          </LeftColumn>
          <RightColumn>
            <Sidebar>
              <Auth />
            </Sidebar>
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

const Sidebar = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding: 1rem;
  width: 24rem;
  height: 98%;
  border-radius: 8px;
  background-color: darkgrey;
`;
